# Notification Service

The **Notification Service** is a microservice responsible for handling asynchronous notifications within the Spotify clone application. It listens for events from other services (like user registration) via RabbitMQ and sends emails using Nodemailer.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Configuration](#configuration)
- [Running the Service](#running-the-service)
- [Message Consumption](#message-consumption)
- [Project Structure](#project-structure)

## Features

- **Event Driven**: Consumes messages from RabbitMQ queues.
- **Email Notifications**: Sends transactional emails (e.g., Welcome Email) using Nodemailer.
- **Scalable**: Decoupled from the main application logic.

## Tech Stack

- **Runtime**: Node.js
- **Framework**: Express.js (minimal setup)
- **Message Broker**: RabbitMQ (amqplib)
- **Email**: Nodemailer

## Prerequisites

Ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v14+ recommended)
- [RabbitMQ](https://www.rabbitmq.com/)
- SMTP credentials (e.g., Gmail, SendGrid)

## Installation

1. Navigate to the `notification` directory:

   ```bash
   cd notification
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

## Configuration

Create a `.env` file in the root of the `notification` directory with the following variables:

```env
RABBITMQ_URI=amqp://localhost
EMAIL_USER=your_email_address
CLIENT_ID=your_oauth_client_id
CLIENT_SECRET=your_oauth_client_secret
REFRESH_TOKEN=your_oauth_refresh_token
JWT_SECRET=your_jwt_secret
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

## Message Consumption

The service subscribes to the following RabbitMQ queues:

| Queue Name     | Payload                                              | Action                                 |
| -------------- | ---------------------------------------------------- | -------------------------------------- |
| `user_created` | `{ email, role, fullname: { firstName, lastName } }` | Sends a welcome email to the new user. |
