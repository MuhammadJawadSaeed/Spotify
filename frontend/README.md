# Spotify Clone Frontend

The **Frontend** is a Single Page Application (SPA) built with React and Vite. It serves as the user interface for the Spotify Clone, allowing users to listen to music, and artists to upload and manage their tracks.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Application](#running-the-application)
- [Project Structure](#project-structure)
- [Routes](#routes)
- [Configuration](#configuration)

## Features

- **User Authentication**: Login and Registration pages.
- **Music Playback**: Dedicated music player interface.
- **Artist Dashboard**: Interface for artists to view their content.
- **Music Upload**: Functionality for artists to upload new tracks and cover images.
- **Real-time Synchronization**: Listens for playback events via Socket.io to synchronize state across devices.

## Tech Stack

- **Framework**: [React](https://react.dev/) (v19)
- **Build Tool**: [Vite](https://vitejs.dev/)
- **Routing**: [React Router DOM](https://reactrouter.com/) (v7)
- **HTTP Client**: [Axios](https://axios-http.com/)
- **Real-time**: [Socket.io Client](https://socket.io/)
- **Styling**: CSS Modules / Standard CSS

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16+ recommended)

## Installation

1.  Navigate to the `frontend` directory:

    ```bash
    cd frontend
    ```

2.  Install dependencies:
    ```bash
    npm install
    ```

## Running the Application

### Development Mode

Starts the Vite development server.

```bash
npm run dev
```

The application will typically run on `http://localhost:5173`.

### Production Build

Builds the application for production.

```bash
npm run build
```

### Preview Production Build

Previews the built application.

```bash
npm run preview
```

## Project Structure

```
frontend/
├── public/             # Static assets
├── src/
│   ├── assets/         # Source assets (images, icons)
│   ├── pages/          # Page components
│   │   ├── artist/     # Artist-specific pages (Dashboard, Upload)
│   │   ├── music/      # Music-specific pages (Player)
│   │   ├── Home.jsx    # Home page
│   │   ├── Login.jsx   # Login page
│   │   └── Register.jsx# Registration page
│   ├── App.css         # Global styles
│   ├── App.jsx         # Main application component & Routing
│   └── main.jsx        # Entry point
├── index.html          # HTML template
├── package.json        # Dependencies and scripts
└── vite.config.js      # Vite configuration
```

## Routes

| Path                             | Component         | Description                  |
| :------------------------------- | :---------------- | :--------------------------- |
| `/`                              | `Home`            | Main landing page.           |
| `/register`                      | `Register`        | User registration.           |
| `/login`                         | `Login`           | User login.                  |
| `/artist/dashboard`              | `ArtistDashboard` | Dashboard for artists.       |
| `/artist/dashboard/upload-music` | `UploadMusic`     | Form to upload new music.    |
| `/music/:id`                     | `MusicPlayer`     | Player for a specific track. |

## Configuration

The application connects to backend services. Ensure the backend services are running on their expected ports.

- **Socket.io Connection**: Configured in `App.jsx` to connect to `http://localhost:3002` (Music Service).
