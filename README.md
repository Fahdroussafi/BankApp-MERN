# BankApp MERN Stack Application

## About

This is a simple MERN stack application that allows users to create an account, open a bank account, login, and view their account balance and transactions, aswell as deposit, withdraw or transfer funds to another bank account. There's also an admin simple dashboard where we can view all the users that are registered. The application is built using the MERN stack (MongoDB, Express, React, Node.js) and uses Redux for state management.

## Usage

### Install

1. Install Docker for your operating system.
2. Install the [Docker Compose](https://docs.docker.com/compose/install/) tool.
3. Run docker-compose

```
docker-compose up -d --build
```

This will start api, frontend and MongoDB.

## Quick Start

```bash
# Install dependencies for api
cd api
npm install

# Install dependencies for frontend
cd frontend
npm install

# Run the Express server only
npm run dev

# Run the React client only
npm run start

# Server runs on http://localhost:8080 and client on http://localhost:3000
```
