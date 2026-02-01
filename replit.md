# Vibe Connect

## Overview
Vibe Connect is a customer engagement platform with a React frontend and a Node.js/Express backend.

## Project Structure
- **connect-plus/**: React frontend application (Create React App)
  - Runs on port 5000
  - Uses TailwindCSS for styling
  - Socket.io client for real-time communication
  
- **xpresschat/**: Node.js/Express backend API
  - Uses MongoDB for database
  - Socket.io for real-time messaging
  - Runs on port 5050

## Configuration

### Frontend Environment Variables
- `REACT_APP_API_URL`: Backend API URL (defaults to https://vibe.fixall.ai/xpresschat)
- `REACT_APP_SOCKET_URL`: Socket.io server URL
- `REACT_APP_ACCESS_KEY_ID`: AWS access key for S3
- `REACT_APP_SECRET_ACCESS_KEY`: AWS secret key
- `REACT_APP_AWS_REGION`: AWS region
- `REACT_APP_AWS_BUCKET`: S3 bucket name

### Backend Environment Variables (xpresschat)
- `MONGO_URL`: MongoDB connection string
- `PORT`: Server port (defaults to 5050)
- `JWT_SECRETKEY`: JWT secret for authentication

## Running the Project
The frontend runs via the "Frontend" workflow on port 5000.

## Recent Changes
- 2026-02-01: Configured for Replit environment
  - Updated frontend to use environment variables for API/socket URLs
  - Set up port 5000 for frontend with host check disabled for Replit proxy
