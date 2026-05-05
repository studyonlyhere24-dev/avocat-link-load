# Vercel Deployment Setup Guide

## Quick Setup for Vercel

### Step 1: Environment Variables
Set these in your Vercel project settings (Settings → Environment Variables):

```
Name: SUPABASE_URL
Value: https://schjybcanjisfmntodta.supabase.co
Environments: Production, Preview, Development
```

```
Name: SUPABASE_ANON_KEY
Value: sb_publishable_iuMklIByHpf3M_Vk88Qzgg_niEgUIIu
Environments: Production, Preview, Development
```

### Step 2: No Build Configuration Needed
The `vercel.json` file already contains all necessary configuration:
- ✅ Framework: vite
- ✅ Build command: `npm run build`
- ✅ Output directory: `dist`
- ✅ Rewrites for SPA routing
- ✅ Security headers
- ✅ Cache headers

### Step 3: Deploy
Simply push to your Git repository (connected to Vercel):
```bash
git push origin main
```

Vercel will automatically:
1. Detect the vite configuration
2. Install dependencies
3. Build the project
4. Deploy to your domain

## Local Development with Vercel Environment

To test with the same environment variables as production:

1. Create `.env.local`:
```
VITE_SUPABASE_URL=https://schjybcanjisfmntodta.supabase.co
VITE_SUPABASE_ANON_KEY=sb_publishable_iuMklIByHpf3M_Vk88Qzgg_niEgUIIu
```

2. Run dev server:
```bash
npm run dev
```

## Troubleshooting

### Build Fails with "Environment variables not configured"
- ✅ Check Vercel Environment Variables are set correctly
- ✅ Redeploy after updating env vars (Vercel doesn't auto-redeploy)
- ✅ Check build logs in Vercel dashboard

### Blank Page on Vercel
- ✅ Check browser console for errors
- ✅ Verify SUPABASE_URL and SUPABASE_ANON_KEY are set
- ✅ Check that dist/ folder was created during build

### API Requests Fail
- ✅ Verify Supabase project is accessible
- ✅ Check Supabase CORS settings allow your Vercel domain
- ✅ Verify environment variables are correct

## Monitoring

Check your Vercel deployment:
- Dashboard: https://vercel.com/dashboard
- Recent deployments: Shows build status and logs
- Environment variables: Verify they're set correctly
- Analytics: Monitor performance

## Notes

- `vercel.json` correctly handles client-side routing (SPA)
- Security headers are automatically applied to all responses
- Assets are automatically cached with long TTL
- All environment variables are properly isolated from source code

