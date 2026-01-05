# Auth Service

The **Auth Service** is a microservice responsible for user authentication and authorization within the Spotify clone application. It handles user registration, login, and Google OAuth integration.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Service](#running-the-service)
- [API Endpoints](#api-endpoints)
- [Project Structure](#project-structure)

## Features

- **User Registration**: Create new user accounts with validation.
- **User Login**: Authenticate users and issue JWT tokens.
- **Google OAuth**: Sign in with Google using Passport.js.
- **Message Broker Integration**: Publishes events to RabbitMQ (e.g., for user creation).
- **Security**: Password hashing with bcryptjs, JWT for session management.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB (via Mongoose)
- **Authentication**: Passport.js, JSON Web Tokens (JWT), bcryptjs
- **Message Broker**: RabbitMQ (amqplib)
- **Validation**: express-validator

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [MongoDB](https://www.mongodb.com/)
- [RabbitMQ](https://www.rabbitmq.com/)

## Installation

1. Navigate to the `auth` directory:

   ```bash
   cd auth
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

Create a `.env` file in the root of the `auth` directory with the following variables:

```env
MONGO_URI=mongodb://localhost:27017/your_db_name
JWT_SECRET=your_jwt_secret_key
CLIENT_ID=your_google_client_id
CLIENT_SECRET=your_google_client_secret
RABBITMQ_URI=amqp://localhost
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

## API Endpoints

| Method | Endpoint           | Description                                           |
| ------ | ------------------ | ----------------------------------------------------- |
| `POST` | `/register`        | Register a new user. Requires body with user details. |
| `POST` | `/login`           | Authenticate a user. Returns a JWT token.             |
| `GET`  | `/google`          | Initiates Google OAuth authentication flow.           |
| `GET`  | `/google/callback` | Callback URL for Google OAuth.                        |