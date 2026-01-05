# Spotify Clone (Microservices)

A full-stack Spotify clone application built using a microservices architecture. This project demonstrates a scalable application structure with separate services for authentication, music management, and notifications, all connected via a message broker and consumed by a modern React frontend.

## Table of Contents

- [Architecture](#architecture)
- [Services Overview](#services-overview)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Project Structure](#project-structure)

## Architecture

The application is divided into multiple independent services:

1.  **Frontend**: A Single Page Application (SPA) built with React.
2.  **Auth Service**: Handles user registration, login, and OAuth.
3.  **Music Service**: Manages music uploads, streaming, playlists, and real-time playback synchronization.
4.  **Notification Service**: Listens for system events (like new user registration) and sends email notifications.

Communication between services is handled via **RabbitMQ** (asynchronous messaging) and REST APIs.

## Services Overview

| Service           | Path            | Description                                    | Port (Default)      |
| :---------------- | :-------------- | :--------------------------------------------- | :------------------ |
| **Frontend**      | `/frontend`     | React application for users and artists.       | `5173`              |
| **Auth Service**  | `/auth`         | Authentication, JWT issuance, Google OAuth.    | `3000` (or similar) |
| **Music Service** | `/music`        | Music streaming, file uploads (S3), Socket.io. | `3001` (or similar) |
| **Notification**  | `/notification` | Email notifications via Nodemailer & RabbitMQ. | `3002` (or similar) |

## Tech Stack

### Frontend

- **Framework**: React (Vite)
- **Routing**: React Router DOM
- **State/API**: Axios
- **Real-time**: Socket.io Client

### Backend

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (Mongoose)
- **Message Broker**: RabbitMQ (amqplib)
- **Storage**: AWS S3
- **Real-time**: Socket.io
- **Authentication**: Passport.js, JWT, BCrypt

## Prerequisites

Before running the project, ensure you have the following installed and configured:

- **Node.js** (v16+ recommended)
- **MongoDB** (Running locally or a cloud instance)
- **RabbitMQ** (Running locally or via Docker)
- **AWS Account** (For S3 bucket credentials)

## Getting Started

### 1. Clone the Repository

```bash
git clone <repository-url>
cd Spotify
```

### 2. Setup Environment Variables

You need to create a `.env` file in each service directory (`auth`, `music`, `notification`). Refer to the `README.md` inside each folder for specific variables.

**General requirements:**

- `MONGO_URI`
- `RABBITMQ_URI`
- `JWT_SECRET`
- `AWS_ACCESS_KEY_ID` / `AWS_SECRET_ACCESS_KEY` (for Music service)
- `EMAIL_USER` / `EMAIL_PASS` (for Notification service)

### 3. Install Dependencies & Run Services

You need to run each service in a separate terminal.

**Auth Service:**

```bash
cd auth
npm install
npm run dev
```

**Music Service:**

```bash
cd music
npm install
npm run dev
```

**Notification Service:**

```bash
cd notification
npm install
npm run dev
```

**Frontend:**

```bash
cd frontend
npm install
npm run dev
```

## Project Structure

```
Spotify/
├── auth/           # Authentication Microservice
├── frontend/       # React Frontend Application
├── music/          # Music Streaming & Management Microservice
├── notification/   # Notification Microservice
└── README.md       # Project Documentation
```

## Documentation

For detailed documentation on each service, please refer to the README files in their respective directories:

- [Auth Service Documentation](./auth/README.md)
- [Music Service Documentation](./music/README.md)
- [Notification Service Documentation](./notification/README.md)
- [Frontend Documentation](./frontend/README.md)
