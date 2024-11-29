# Blog Backend API

## Overview

This is a full-stack blog application backend built with Node.js, Express, and Prisma. The backend provides a robust API for blog post management, user authentication, and content control.

## Technologies Used

- Node.js
- Express.js
- Prisma ORM
- JSON Web Tokens (JWT)
- Morgan (HTTP request logger)
- Winston (Logging)
- Bcrypt (Password hashing)

## Features

- User authentication with JWT
- CRUD operations for blog posts
- Comment management
- Secure route protection
- Logging and error handling

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- PostgreSQL or another supported Prisma database

## Installation

1. Clone the repository

```bash
git clone git@github.com:nuru484/blog-api-backend.git
cd blog-api-backend
```

2. Install dependencies

```bash
npm install
```

3. Set up environment variables
   Create a `.env` file in the root directory with the following variables:

```
DATABASE_URL="your_database_connection_string"
JWT_SECRET="your_jwt_secret"
PORT=8080
NODE_ENV=development
CORS_ACCESS="your frontend urls"
ACCESS_TOKEN_SECRET=secret keys
REFRESH_TOKEN_SECRET=secret keys

```

4. Run Prisma migrations

```bash
npx prisma migrate dev
```

5. Start the server

```bash
npm run dev  # For development
npm start    # For production
```

## Some API Endpoints

### Authentication

- `POST /api//signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout
- `POST /api/refreshToken` - User logout

### Blog Posts

- `GET /api/posts` - Retrieve all posts
- `GET /api/posts/:id` - Retrieve a specific post
- `POST /api/posts` - Create a new post (protected)
- `PUT /api/posts/:id` - Update a post (protected)
- `DELETE /api/posts/:id` - Delete a post (protected)

### Comments

- `POST /api/comment/posts/:postId/:userId?` - Creating a comment
- `PUT /api/comment/posts/:postId/:commentId` - Update a comment
- `DELETE /api/comment/posts/:postId/:commentId` - Delete a comment (protected)

## Authentication

Authentication is handled via JSON Web Tokens (JWT). Include the token in the Authorization header:

```
Authorization: Bearer <your_jwt_token>
```

## Error Handling

The API uses consistent error responses with appropriate HTTP status codes and descriptive messages.

## Logging

Logging is implemented using Morgan for HTTP request logging and Winston for application logs.

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.

## Contact

Nurudeen Abdul-Majeed - [abdulmajeednurudeen48@gmail.com]
