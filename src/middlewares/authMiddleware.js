// middleware/authMiddleware.js
import jwt from 'jsonwebtoken';

const authenticate = (req, res, next) => {
  // Authentication middleware logic
  const token = req.header('Authorization');

  // Check if token doesn't exist
  if (!token) {
    return res.status(401).json({ message: 'Authorization denied. No token provided.' });
  }

  try {
    // Verify token
    const decoded = jwt.verify(token, 'jwtSecret');
    // Add user from payload to request object
    req.user = decoded.user;
    // Check user role
    if (req.user.role !== 'admin' && req.user.role !== 'user') {
        return res.status(403).json({ message: 'Forbidden. Invalid user role.' });
      }
    next();
  } catch (err) {
    res.status(401).json({ message: 'Invalid token.' });
  }
};

const isAdmin = (req, res, next) => {
  // Admin check middleware logic
};

export { authenticate, isAdmin };
