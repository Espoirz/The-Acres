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

## Railway Deployment

### Step 1: Prepare Your Project
1. Install Railway CLI (optional but recommended):
   ```bash
   npm i -g @railway/cli
   ```
2. Ensure your `package.json` has the following scripts:
   ```json
   {
     "scripts": {
       "build": "vite build && esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist",
       "start": "NODE_ENV=production node dist/index.js"
     }
   }
   ```

### Step 2: Create Railway Project
1. Go to [Railway Dashboard](https://railway.app/dashboard)
2. Click "New Project"
3. Choose "Deploy from GitHub repo"
4. Select your repository

### Step 3: Configure Database
1. Click "New" and add a PostgreSQL database
2. Railway will automatically add the `DATABASE_URL` to your environment variables

### Step 4: Configure Environment Variables
1. Go to your project settings in Railway dashboard
2. Add the following variables:
   - `NODE_ENV`: `production`
   - `PORT`: `3000` (or your preferred port)
   - Any other environment variables your app needs

### Step 5: Configure Build Settings
1. Go to project settings
2. Set the following:
   - Start Command: `npm start`
   - Build Command: `npm run build`
   - Watch Paths: `client/**, server/**`

### Step 6: Deploy
1. Railway will automatically deploy when you push to your main branch
2. You can also trigger manual deploys from the dashboard

### Troubleshooting Railway Deployment

1. **Build Fails**
   - Check the build logs in Railway dashboard
   - Ensure all dependencies are in `package.json`
   - Verify your Node.js version in `package.json` or `.node-version`

2. **Runtime Errors**
   - Check application logs in Railway dashboard
   - Verify environment variables are set correctly
   - Ensure database connection is working

3. **Database Connection Issues**
   - Confirm `DATABASE_URL` is set in Railway environment variables
   - Check if the database service is running
   - Verify your database migration has run: `railway run npm run db:push`

4. **Common Solutions**
   - Clear build cache in Railway dashboard
   - Ensure you're not exceeding Railway's free tier limits
   - Check if your port configuration matches Railway's requirements

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

### For Railway
1. Railway will provision a PostgreSQL database automatically
2. Connection string will be available as `DATABASE_URL` in environment variables
3. Run migrations: `railway run npm run db:push`

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
- **Railway**: View logs in the Railway dashboard