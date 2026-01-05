# Music Service

The **Music Service** is a core microservice of the Spotify clone application, responsible for managing music tracks, playlists, and streaming functionality. It handles file uploads to AWS S3, metadata storage in MongoDB, and real-time features via Socket.io.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Service](#running-the-service)
- [API Endpoints](#api-endpoints)
- [Socket Events](#socket-events)
- [Project Structure](#project-structure)

## Features

- **Music Management**: Upload, retrieve, and stream music tracks.
- **Playlist Management**: Create and manage playlists.
- **Artist Features**: Specialized endpoints for artists to manage their content.
- **File Handling**: Uses **Multer** to process `multipart/form-data` uploads for music tracks and cover images.
- **File Storage**: Integration with AWS S3 for secure and scalable storage of audio files and images.
- **Real-time Updates**: **Socket.io** integration enables real-time communication between the client and server. Its primary purpose here is to synchronize music playback across multiple devices or sessions for the same user.
- **Authentication**: JWT-based authentication and role-based access control (User/Artist).

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **File Handling**: Multer
- **Storage**: AWS S3 (@aws-sdk/client-s3)
- **Real-time**: Socket.io
- **Authentication**: JSON Web Tokens (JWT)

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [MongoDB](https://www.mongodb.com/)
- AWS Account with S3 Bucket access

## Installation

1. Navigate to the `music` directory:

   ```bash
   cd music
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

Create a `.env` file in the root of the `music` directory with the following variables:

```env
MONGO_URI=mongodb://localhost:27017/music
JWT_SECRET=your_jwt_secret_key
AWS_REGION=your_aws_region
AWS_ACCESS_KEY_ID=your_aws_access_key
AWS_SECRET_ACCESS_KEY=your_aws_secret_key
```

## Running the Service

### Development Mode

Runs the server with `nodemon` for hot-reloading.

```bash
npm run dev
```

### Production Mode

Runs the server using `node`.

```bash
npm start
```

## File Upload Handling

The service uses **Multer** to handle `multipart/form-data` requests for file uploads. Files are temporarily stored in memory (`multer.memoryStorage()`) before being uploaded to AWS S3.

### Upload Endpoint: `/upload`

When calling the `/upload` endpoint, ensure the request is `multipart/form-data` and includes the following fields:

- **`music`** (File): The audio file to be uploaded. (Max count: 1)
- **`coverImage`** (File): The cover image for the track. (Max count: 1)
- **`title`** (Text): The title of the music track.

**Note:** Both `music` and `coverImage` files are required.

## API Endpoints

### Music

| Method | Endpoint           | Description                                         | Auth   |
| ------ | ------------------ | --------------------------------------------------- | ------ |
| `POST` | `/upload`          | Upload music and cover image.                       | Artist |
| `GET`  | `/`                | Get all music tracks.                               | User   |
| `GET`  | `/get-details/:id` | Get details of a specific track.                    | User   |
| `GET`  | `/artist-musics`   | Get all music uploaded by the authenticated artist. | Artist |

### Playlists

| Method | Endpoint           | Description                                        | Auth   |
| ------ | ------------------ | -------------------------------------------------- | ------ |
| `POST` | `/playlist`        | Create a new playlist.                             | Artist |
| `GET`  | `/playlist/artist` | Get playlists created by the authenticated artist. | Artist |
| `GET`  | `/playlist`        | Get all playlists.                                 | User   |
| `GET`  | `/playlist/:id`    | Get a specific playlist by ID.                     | User   |

## Socket Events

to enable real-time, bidirectional communication.

**Purpose:**
The primary use case in this service is **Playback Synchronization**. When a user plays a track on one device, the `play` event is broadcasted to all other connected clients for that specific user. This ensures that if a user switches devices or has multiple tabs open, the playback state can be synchronized
The service uses **Socket.io** for real-time features.

- **Authentication**: The socket server uses `cookie-parser` to read the `token` from the handshake cookies. A valid JWT token is required to establish a connection.
- **Events**:
  - `play`: Broadcasts music playback events to the user's other sessions.
