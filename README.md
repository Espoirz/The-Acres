# Game Application

A full-stack web application built with React, Express, and PostgreSQL.

## Tech Stack

- **Frontend**: React + TypeScript + Vite
- **Backend**: Express.js + TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: Passport.js
- **Styling**: Tailwind CSS

## Local Development

1. Clone the repository
2. Install dependencies: `npm install`
3. Set up environment variables: Copy `.env.example` to `.env` and fill in your values
4. Run database migrations: `npm run db:push`
5. Start development server: `npm run dev`

## Deployment

### Render (Full-stack)

1. **Fork/Clone this repository**
2. **Connect to Render**:
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New +" and select "Web Service"
   - Connect your GitHub repository
3. **Configure the service**:
   - Build Command: `npm run build:render`
   - Start Command: `npm start`
   - Environment: `Node`
   - Auto-Deploy: `No` (recommended for production)
4. **Set up database**:
   - Create a PostgreSQL database in Render
   - Add the `DATABASE_URL` environment variable
5. **Deploy**: Click "Create Web Service"

### Vercel (Frontend + Serverless Functions)

1. **Fork/Clone this repository**
2. **Connect to Vercel**:
   - Go to [Vercel Dashboard](https://vercel.com/dashboard)
   - Click "New Project"
   - Import your GitHub repository
3. **Configure the project**:
   - Framework Preset: `Vite`
   - Root Directory: `./` (leave as default)
   - Build Command: `npm run build:vercel`
   - Output Directory: `dist/public`
4. **Set up database**:
   - Create a PostgreSQL database (e.g., on Neon, Supabase, or PlanetScale)
   - Add the `DATABASE_URL` environment variable in Vercel
5. **Deploy**: Click "Deploy"

## Environment Variables

Required environment variables:

- `DATABASE_URL`: PostgreSQL connection string
- `NODE_ENV`: Set to `production` for production deployments

## Scripts

- `npm run dev`: Start development server
- `npm run build`: Build for production
- `npm run build:render`: Build for Render deployment
- `npm run build:vercel`: Build for Vercel deployment
- `npm start`: Start production server
- `npm run db:push`: Push database schema changes
- `npm run db:migrate`: Run database migrations

## Features

- Modern React frontend with TypeScript
- Express.js backend API
- PostgreSQL database with Drizzle ORM
- Authentication system
- Responsive UI with Tailwind CSS
- Real-time features with WebSockets