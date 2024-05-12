# Enhanced-Authentication-API-Voosh
Overview
The Enhanced Authentication API (Voosh) is a Node.js application with a MongoDB backend, designed to provide robust and secure authentication services for web applications. It offers a comprehensive set of features for user management, authentication, and authorization.

Features
    Registration: Provides a registration page with role-based access control. Different roles (e.g., admin, normal user) have different privileges upon registration.

    Login with JWT Authentication: Implements JWT token-based authentication for secure user login.

    Profile Management: Users can view and update their profiles, including updating profile information and profile picture. Profile pictures can be updated using either a URL or by uploading a file.

    Google-based Login: Supports authentication via Google OAuth for seamless login experience.

    Public and Private Profile Viewing: Profiles can be configured as public or private. Admin users can view both public and private profiles, while normal users can only view public profiles.

Installation

Clone the repository - https://github.com/fahadalim/Enhanced-Authentication-API-Voosh.git
Install dependencies: cd enhanced-authentication-api-voosh    
                        npm install
Configure environment variables:
Create a .env file in the root directory and provide the necessary configuration variables.

Run the application:  npm start

API Documentation

Introduction
The Enhanced Authentication API (Voosh) provides endpoints for user registration, authentication, profile management, and role-based access control. This documentation outlines the available endpoints, their functionalities, and the expected request/response formats.

Prod base url: https://enhanced-authentication-api-voosh.onrender.com/
Loacl base url : http://localhost:3000/

Authentication
Register User
Endpoint: POST auth/register
Description: Register a new user.
Request body
{
  "username": "string",
  "email": "string",
  "password": "string",
  "role": "admin,user" (optional, default user)
}

Response:
Status: 201 Created
{
    "token":"token"
}

Login User
Endpoint: POST /auth/login
Description: Login existing user and receive JWT token for authentication.
Request body:
    {
  "username": "string",
  "password": "string"
    }

Response
Status: 201 Created
{
    "token":"JWT_TOKEN"
}


Google-based Login
Google OAuth Redirect
Endpoint: GET /auth/google
Description: Redirect to Google OAuth login page.

Google OAuth Callback
Endpoint: GET /auth/google/callback
Description: Callback endpoint for Google OAuth authentication.

Logout User
Endpoint: GET /auth/logout
Description: Logs out the currently authenticated user.
Request Headers:
Authorization: Bearer JWT_TOKEN
Response:
Status: 200 OK
body:
{
  "message": "User logged out successfully"
}

Profile Management

Get User Profile
Endpoint: GET profile/me
Description: Get user profile information.
Request Headers:
Authorization: Bearer JWT_TOKEN

response
{
  "username": "string",
  "email": "string",
  "role": "string",
  "bio": "string"
  "profilePicture": "string"
}

Update User Profile
Endpoint: PUT /profile/me
Description: Update user profile information.
Request Headers:
Authorization: Bearer JWT_TOKEN
request body:
{
  "username": "string",
  "email": "string",
  "profilePicture": "string",
  "bio": "string",
  "phone":"string
}

Response
Status: 201 Created
{
    "message": 'Profile updated'
}


Update Profile Visibility
Endpoint: PUT /profile/visibility
Description: Updates the visibility of the user's profile.
Request Headers:
Authorization: Bearer JWT_TOKEN
Body:
{
  "visibility": "public" | "private"
}

Response:
Status: 200 OK
Body:
{
  "message": "Profile visibility updated successfully"
}

Get User Profile by ID
Endpoint: GET /profile/:userId
Description: Retrieves the profile of a specific user by their user ID. If user is admin then he will get both profile public and private  but if user is not amdin then he won't be able to see private profile. it is known by token passed.
Request Headers:
Authorization: Bearer JWT_TOKEN
Request Parameters:
userId: The ID of the user whose profile is to be retrieved.
Response:
Status: 200 OK
body:
{
  "username": "string",
  "role": "string",
  "profilePicture": "string",
  "bio":"string",
  "phone":"string"
}






