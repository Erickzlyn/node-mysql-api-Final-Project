# Full-Stack Authentication System - Backend API

## Live Deployment
- **Backend API**: https://node-mysql-api-final-project.onrender.com
- **API Documentation**: https://node-mysql-api-final-project.onrender.com/api-docs
- **Frontend Application**: https://angular-21-auth-boilerplate-9etv.onrender.com

## Overview
Node.js + Express backend providing JWT authentication with MySQL database integration. Features include:
- User registration with email verification
- JWT-based authentication with refresh tokens
- Role-based access control (Admin/User)
- Password reset with email links
- Swagger API documentation

## Tech Stack
- **Runtime**: Node.js with TypeScript
- **Framework**: Express.js
- **Database**: MySQL (FreeSQLDatabase)
- **ORM**: Sequelize
- **Authentication**: JWT with express-jwt
- **Email**: Resend SMTP provider
- **API Docs**: Swagger/OpenAPI

## Getting Started

### Prerequisites
- Node.js 18+
- MySQL 8.0+
- npm or yarn

### Local Development

1. **Clone Repository**
```bash
git clone https://github.com/Erickzlyn/node-mysql-api-Final-Project.git
cd node-mysql-api-main
```

2. **Install Dependencies**
```bash
npm install
```

3. **Configure Environment**
Copy `.env.example` to `.env` and fill in your values:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
DB_HOST=sql12.freesqldatabase.com
DB_USER=your_user
DB_PASSWORD=your_password
JWT_SECRET=your_strong_secret_key
RESEND_API_KEY=your_resend_key
EMAIL_FROM=your-email@domain.com
CORS_ORIGIN=http://localhost:4200
NODE_ENV=development
```

4. **Run Development Server**
```bash
npm run start:dev
```

Server runs on `http://localhost:4000`

5. **Access API Documentation**
Navigate to `http://localhost:4000/api-docs` in your browser

## Deployment on Render

### 1. Connect GitHub Repository
- Create a new Web Service on Render
- Connect to your GitHub repository
- Select branch to deploy

### 2. Configure Environment Variables
In Render dashboard, set these under "Environment":
```
DB_HOST=sql12.freesqldatabase.com
DB_PORT=3306
DB_USER=sql12827725
DB_PASSWORD=<your-db-password>
DB_NAME=sql12827725
JWT_SECRET=<generate-strong-random-key>
RESEND_API_KEY=<your-resend-api-key>
EMAIL_FROM=onboarding@resend.dev
CORS_ORIGIN=https://angular-21-auth-boilerplate-9etv.onrender.com
NODE_ENV=production
PORT=3000
```

### 3. Build and Start Commands
- **Build Command**: `npm install`
- **Start Command**: `npm start`

### 4. Verify Deployment
- API accessible at: `https://node-mysql-api-final-project.onrender.com`
- Swagger docs at: `https://node-mysql-api-final-project.onrender.com/api-docs`

## API Endpoints

### Authentication
- `POST /accounts/register` - Register new user
- `POST /accounts/authenticate` - Login with email/password
- `POST /accounts/refresh-token` - Refresh JWT token
- `POST /accounts/revoke-token` - Logout (revoke token)

### Email Verification
- `POST /accounts/verify-email` - Verify email with token
- `POST /accounts/forgot-password` - Request password reset
- `POST /accounts/validate-reset-token` - Validate reset token
- `POST /accounts/reset-password` - Reset password with token

### Account Management
- `GET /accounts` - Get all users (Admin only)
- `GET /accounts/:id` - Get user by ID
- `POST /accounts` - Create new user (Admin only)
- `PUT /accounts/:id` - Update user profile
- `DELETE /accounts/:id` - Delete account

## Security

### Best Practices Implemented
✅ **No Hardcoded Secrets**: All sensitive data in environment variables  
✅ **CORS Protection**: Configured for specific frontend URL  
✅ **JWT Security**: Short-lived tokens (15min) with refresh mechanism  
✅ **Password Hashing**: bcryptjs with salt rounds  
✅ **SQL Injection Prevention**: Sequelize ORM parameterized queries  
✅ **Email Verification**: Token-based verification for new accounts  

### Environment Variables
Never commit `.env` file. Use `.env.example` for documentation:
```bash
# Already in .gitignore
.env
```

## Database Schema

### Account Table
- `id`: Primary key
- `email`: Unique email
- `passwordHash`: bcrypt hashed password
- `title`, `firstName`, `lastName`: User info
- `role`: 'Admin' or 'User'
- `verified`: Email verification timestamp
- `resetToken`: Password reset token
- `resetTokenExpires`: Token expiry
- `created`: Account creation timestamp
- `updated`: Last update timestamp

### RefreshToken Table
- `id`: Primary key
- `accountId`: Foreign key to Account
- `token`: Unique refresh token
- `expires`: Token expiry date
- `revoked`: Revocation timestamp
- `replacedByToken`: Token that replaced this one
- `createdByIp`: IP address of creation
- `revokedByIp`: IP address of revocation
- `created`: Creation timestamp

## Error Handling
- 400: Bad Request (validation errors)
- 401: Unauthorized (missing/invalid token)
- 404: Not Found
- 500: Server error with detailed message

## Email Templates
Emails are sent via Resend provider:
- **Verification Email**: Link to verify email
- **Password Reset**: Link to reset password (valid 24hrs)
- **Already Registered**: Notification if email already exists

## Testing Stages

### Stage A: Fake Backend Testing
Enable fake backend in Angular for testing without API:
1. Set `useFakeBackend: true` in Angular `app.module.ts`
2. Test registration, login, admin access

### Stage B: Integration Testing
Disable fake backend and test with live API:
1. Register real user
2. Click email verification link
3. Verify database updates
4. Test JWT and refresh tokens
5. Test RBAC (Admin vs User)

## License
ISC

## Support
For issues or questions, refer to GitHub Issues or contact the development team.
