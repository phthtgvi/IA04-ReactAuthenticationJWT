# React Authentication with JWT (Access + Refresh)

A complete React single-page application implementing secure authentication using JWT access tokens and refresh tokens. Built with Next.js, NestJS, Axios, React Query, and React Hook Form.

## Tech Stack

### Frontend (client-app)
- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Axios
- React Query (@tanstack/react-query)
- React Hook Form

### Backend (server)
- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- JWT (jsonwebtoken)
- Passport.js
- bcrypt

## Setup Instructions

### Prerequisites
- Node.js (v18 or higher)
- PostgreSQL database
- npm or yarn

### 1. Clone the Repository
```bash
git clone <repository-url>
cd IA04-ReactAuthenticationJWT
```

### 2. Server Setup

#### Install Dependencies
```bash
cd server
npm install
```

#### Environment Configuration
Create a `.env` file in the server directory:
```env
DATABASE_HOST=localhost
DATABASE_PORT=5432
DATABASE_USER=postgres
DATABASE_PASSWORD=your_password
DATABASE_NAME=jwt_auth_db
JWT_SECRET=your-super-secret-jwt-key-here
JWT_REFRESH_SECRET=your-super-secret-refresh-key-here
PORT=3000
```

#### Database Setup
1. Create a PostgreSQL database named `jwt_auth_db`
2. The application will automatically create tables on first run (synchronize: true)

#### Start the Server
```bash
npm run start:dev
```
Server will run on http://localhost:3000

### 3. Client Setup

#### Install Dependencies
```bash
cd client-app
npm install
```

#### Environment Configuration
Create a `.env.local` file in the client-app directory:
```env
NEXT_PUBLIC_API_URL=http://localhost:3000
```

#### Start the Client
```bash
npm run dev
```
Client will run on http://localhost:3001

## Usage

### 1. Registration
- Navigate to `/signup`
- Enter email and password (minimum 6 characters)
- Account will be created with hashed password

### 2. Login
- Navigate to `/login`
- Enter registered email and password
- Receive access token (stored in memory) and refresh token (stored in localStorage)
- Automatically redirected to dashboard

### 3. Dashboard
- Protected route accessible only when authenticated
- Displays user profile information
- Shows authentication status and token information

### 4. Logout
- Click logout button on dashboard
- Clears all tokens and redirects to login page
- Invalidates refresh token on server

## API Endpoints

### Authentication
- `POST /auth/login` - User login
- `POST /auth/refresh` - Refresh access token
- `POST /auth/logout` - Logout (requires authentication)
- `POST /auth/logout-all` - Logout from all devices
- `GET /auth/profile` - Get user profile (requires authentication)

### User Management
- `POST /user/register` - User registration

## Security Features

- **Password Hashing**: bcrypt with salt rounds
- **JWT Tokens**: Separate access and refresh tokens
- **Token Expiration**: Short-lived access tokens with automatic refresh
- **CORS Configuration**: Proper cross-origin resource sharing
- **Input Validation**: Server-side validation using class-validator
- **Protected Routes**: Authentication guards on sensitive endpoints

## Development

### Server Development
```bash
cd server
npm run start:dev
```

### Client Development
```bash
cd client-app
npm run dev
```

### Building for Production

#### Server
```bash
cd server
npm run build
npm run start:prod
```

#### Client
```bash
cd client-app
npm run build
npm start
```