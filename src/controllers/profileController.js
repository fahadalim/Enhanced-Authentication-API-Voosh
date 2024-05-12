// controllers/profileController.js
import User from '../models/user.js';
import multer from 'multer';
import axios from 'axios';

// Set up multer storage configuration for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage }).single('profilePicture');

const getMyProfile = async (req, res) => {
    // Get current user's profile logic
    try {
        // Fetch user profile details based on user ID from JWT token
        const user = await User.findById(req.user.id).select('-password');

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const updateMyProfile = async (req, res) => {
    // Update current user's profile logic
    const { username, bio, phone, email, imageUrl } = req.body;

    try {
        // Fetch user profile details based on user ID from JWT token
        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user profile fields
        if (username) user.username = username;
        if (bio) user.bio = bio;
        if (phone) user.phone = phone;
        if (email) user.email = email;

        // Handle file upload using multer middleware
        upload(req, res, async function (err) {
            if (err instanceof multer.MulterError) {
                // A multer error occurred (e.g., file size limit exceeded)
                return res.status(400).json({ message: err.message });
            } else if (err) {
                // An unexpected error occurred
                return res.status(500).json({ message: 'Server error' });
            }

            // If profile picture is uploaded, store file buffer in the user document
            if (req.file) {
                user.profilePicture = req.file.buffer;
            }

            // If image URL is provided, fetch the image data and store it
            if (imageUrl) {
                // Fetch image data from the provided URL
                const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
                user.profilePicture = response.data; // Store image data in the user document
            }

            // Save updated user profile to the database
            user = await user.save();

            // Return updated user profile details
            res.json(user);
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const updateProfileVisibility = async (req, res) => {
    // Update current user's profile visibility logic
    const { visibility } = req.body;

    try {
        // Fetch user profile details based on user ID from JWT token
        let user = await User.findById(req.user.id);

        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Update user profile visibility
        user.profileVisibility = visibility;

        // Save updated user profile to the database
        user = await user.save();

        // Return updated user profile visibility
        res.json({ message: 'Profile visibility updated', profileVisibility: user.profileVisibility });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

const getUserProfile = async (req, res) => {
    // Get user's profile logic
    const userId = req.params.userId;

    try {
        // Fetch user profile details based on user ID
        const user = await User.findById(userId).select('-password');
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }

        // Check if the requesting user is an admin
        if (req.user.role === 'admin') {
            // Admin can see both public and private profiles
            return res.json(user);
        }

        // For normal users
        if (user.profileVisibility === 'private') {
            // Normal user cannot see private profiles of other users
            return res.status(403).json({ message: 'Profile is private' });
        }

        // Normal user can see public profiles of other users and their own profile
        if (user.profileVisibility === 'public' || userId === req.user.id) {
            return res.json(user);
        }

        // If none of the conditions match, return a 403 Forbidden response
        return res.status(403).json({ message: 'Forbidden' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server error');
    }
};

export { getMyProfile, updateMyProfile, updateProfileVisibility, getUserProfile };
