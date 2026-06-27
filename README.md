# SnapCut AI Deployment Guide

SnapCut AI is a modern SaaS for AI background removal built with React, Supabase, and n8n.

## Prerequisites
- Node.js (v18+)
- Supabase Project
- n8n Cloud or Self-hosted instance
- Cloudinary Account
- Remove.bg API Key
- Razorpay Account

## 1. Supabase Setup
1. Create a new Supabase project.
2. Go to SQL Editor and run the script located at `supabase/schema.sql`.
3. Enable Email/Password Authentication in Auth Settings.

## 2. n8n Automation Setup
1. Open your n8n workspace.
2. Import the workflows from the `n8n/` directory:
   - `process_image_workflow.json`
   - `razorpay_webhook_workflow.json`
   - `cleanup_cron_workflow.json`
3. Update the credentials in n8n for:
   - Supabase Service Role Key
   - Remove.bg API Key
   - Cloudinary integration
4. Activate the workflows and copy the Webhook URLs.

## 3. Frontend Setup
1. Clone this repository or copy the `snapcut-ai` folder.
2. Run `npm install` to install dependencies.
3. Copy `.env.example` to `.env` and fill in your Supabase and Razorpay keys.
4. Run `npm run dev` to start the local development server.
5. Build the production app using `npm run build`.

## 4. Hosting
Deploy the frontend to Vercel or Netlify by linking your GitHub repository and setting the environment variables in their respective dashboards.
