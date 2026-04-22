<div align="center">
<img width="1200" height="475" alt="GHBanner" src="https://github.com/user-attachments/assets/0aa67016-6eaf-458a-adb2-6e31a0763ed6" />
</div>

# Connect - Lead Intelligence

AI-powered lead generation platform for SMMs with integrated AI Coach for automated lead analysis and recommendations.

## Features

- Lead management and tracking
- AI-powered coach for lead analysis
- Feed configuration
- User authentication (login/register)
- Settings management

## Prerequisites

- Node.js 18+
- npm or yarn

## Run Locally

```bash
npm install
npm run dev
```

The app will be available at http://localhost:3000

## Deploy to Vercel

1. Install Vercel CLI:
   ```bash
   npm i -g vercel
   ```

2. Deploy:
   ```bash
   vercel
   ```

3. Or connect your GitHub repository to Vercel for automatic deployments:
   - Go to https://vercel.com
   - Import your repository
   - Add environment variables in Vercel dashboard:
     - `GEMINI_API_KEY` - Your Gemini API key
