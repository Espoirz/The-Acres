# Deployment Guide

## Pre-deployment Checklist

- [ ] Environment variables are set up correctly
- [ ] Database is configured and accessible
- [ ] Dependencies are up to date
- [ ] Build process works locally (`npm run build`)
- [ ] Application starts correctly (`npm start`)
- [ ] API endpoints are working
- [ ] Database migrations are applied

## Render Deployment

### Step 1: Prepare Repository
1. Ensure all changes are committed and pushed to GitHub
2. Create a new branch for production if desired

### Step 2: Create Render Service
1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click "New +" and select "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: `your-app-name`
   - **Branch**: `main` or your production branch
   - **Runtime**: `Node`
   - **Build Command**: `npm run build:render`
   - **Start Command**: `npm start`

### Step 3: Configure Database
1. Create a PostgreSQL database in Render
2. Note the connection string
3. Add environment variables to your web service:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `NODE_ENV`: `production`

### Step 4: Deploy
1. Click "Create Web Service"
2. Monitor the build logs
3. Once deployed, test the application

## Vercel Deployment

### Step 1: Prepare Repository
1. Ensure all changes are committed and pushed to GitHub
2. The `api/` directory should be properly configured

### Step 2: Create Vercel Project
1. Go to [Vercel Dashboard](https://vercel.com/dashboard)
2. Click "New Project"
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: `Vite`
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build:vercel`
   - **Output Directory**: `dist/public`

### Step 3: Configure Database
1. Set up a PostgreSQL database (Neon, Supabase, or PlanetScale)
2. Add environment variables in Vercel project settings:
   - `DATABASE_URL`: Your PostgreSQL connection string
   - `NODE_ENV`: `production`

### Step 4: Deploy
1. Click "Deploy"
2. Monitor the deployment process
3. Test the application once deployed

## Environment Variables

### Required Variables
- `DATABASE_URL`: PostgreSQL connection string
- `NODE_ENV`: Set to `production`

### Optional Variables
- `SESSION_SECRET`: For session management
- `OAUTH_CLIENT_ID`: For OAuth authentication
- `OAUTH_CLIENT_SECRET`: For OAuth authentication

## Database Setup

### For Render
1. Create a PostgreSQL database in Render
2. Use the provided connection string
3. Run migrations: `npm run db:push`

### For Vercel
1. Use external PostgreSQL provider:
   - [Neon](https://neon.tech/) (recommended)
   - [Supabase](https://supabase.com/)
   - [PlanetScale](https://planetscale.com/)
2. Get connection string from provider
3. Add to Vercel environment variables

## Post-deployment Testing

- [ ] Website loads correctly
- [ ] API endpoints respond
- [ ] Database connections work
- [ ] Authentication works (if applicable)
- [ ] All features function as expected

## Troubleshooting

### Common Issues

1. **Build fails**: Check build logs and ensure all dependencies are installed
2. **Database connection fails**: Verify DATABASE_URL is correct
3. **API routes not working**: Ensure API directory structure is correct for Vercel
4. **Environment variables not working**: Check they're properly set in deployment platform

### Logs

- **Render**: Check logs in the Render dashboard
- **Vercel**: Use `vercel logs` command or check in dashboard

## Monitoring

- Set up monitoring for your deployed application
- Monitor database performance and connections
- Set up alerts for downtime or errors