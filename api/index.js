// Vercel serverless function handler
import { createServer } from '../dist/index.js';

let cachedServer;

export default async function handler(req, res) {
  if (!cachedServer) {
    const { app } = await createServer();
    cachedServer = app;
  }
  return cachedServer(req, res);
}