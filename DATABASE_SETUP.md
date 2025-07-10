# Database Setup Instructions

## Overview
This project requires a PostgreSQL database. We recommend using Neon Database (serverless PostgreSQL) which integrates well with Replit projects.

## Steps to Setup

### 1. Create a Neon Database
1. Go to [Neon Database](https://neon.tech/)
2. Sign up for a free account
3. Create a new project
4. Copy the connection string (it will look like: `postgresql://username:password@hostname.neon.tech/database?sslmode=require`)

### 2. Configure Environment Variables
1. Open the `.env` file in the root directory
2. Replace the placeholder `DATABASE_URL` with your actual Neon database connection string:
   ```
   DATABASE_URL="postgresql://your-username:your-password@your-host.neon.tech/your-database?sslmode=require"
   ```
3. Update the `SESSION_SECRET` to a secure random string
4. If using Replit, update `REPLIT_DOMAINS` to your actual Replit domain

### 3. Run Database Migrations
```bash
npm run db:push
```

This will create all the necessary tables in your database based on the schema.

### 4. Start the Application
```bash
npm run dev
```

## Troubleshooting

### "DATABASE_URL must be set" Error
This error occurs when the DATABASE_URL environment variable is not configured. Make sure:
1. The `.env` file exists in the root directory
2. The DATABASE_URL is properly set in the `.env` file
3. The database connection string is valid and accessible

### Connection Issues
- Ensure your database allows connections from your current IP/environment
- Check that the connection string includes `?sslmode=require` for Neon databases
- Verify the username, password, and database name are correct

### Missing Tables
If you get errors about missing tables, run the database migration:
```bash
npm run db:push
```

## Environment Variables Reference

| Variable | Description | Example |
|----------|-------------|---------|
| `DATABASE_URL` | PostgreSQL connection string | `postgresql://user:pass@host.neon.tech/db?sslmode=require` |
| `SESSION_SECRET` | Secret key for session encryption | `your-super-secret-key-here` |
| `REPLIT_DOMAINS` | Allowed domains for Replit auth | `your-app.replit.dev` |
| `ISSUER_URL` | OpenID Connect issuer URL | `https://replit.com` |
| `NODE_ENV` | Environment mode | `development` or `production` |