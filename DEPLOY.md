# Deployment Guide

The easiest way to deploy your Next.js application is to use [Vercel](https://vercel.com), the creators of Next.js.

## Option 1: Deploy with Vercel (Recommended)

1.  **Push your code to GitHub/GitLab/Bitbucket**.
2.  **Sign up/Login to Vercel**.
3.  **Import your repository**.
    *   Click "Add New..." -> "Project".
    *   Select your repository.
4.  **Configure Project**.
    *   Framework Preset: Next.js (detected automatically).
    *   **Environment Variables**: If you are using the Aviationstack API, add your API key here:
        *   `AVIATIONSTACK_API_KEY`: Your API key.
5.  **Deploy**.
    *   Click "Deploy". Vercel will build and deploy your site.

## Option 2: Self-Hosting (Docker / Node.js)

### Build for Production
Run the build command to create an optimized production build:
```bash
npm run build
```

### Start Production Server
```bash
npm start
```

### Docker
You can also containerize the application. Create a `Dockerfile`:

```dockerfile
FROM node:18-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
RUN npm run build
EXPOSE 3000
CMD ["npm", "start"]
```

## Important Notes
- **Environment Variables**: Ensure you set up any necessary environment variables (like API keys) in your deployment platform.
- **Time Zones**: Server time might differ from local time. Ensure your date/time logic handles time zones correctly (using UTC or libraries like `date-fns-tz`).
