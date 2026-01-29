# Quick Start Checklist: Enable Cloud Sync

**Time to set up**: ~15 minutes

## Step 1: Create Supabase Account (3 minutes)

- [ ] Go to https://supabase.com
- [ ] Sign up or sign in
- [ ] Click "New Project"
- [ ] Fill in project name, database password, and region
- [ ] Wait 2-3 minutes for project to initialize

## Step 2: Set Up Database (3 minutes)

- [ ] Open Supabase dashboard → **SQL Editor**
- [ ] Click "New Query"
- [ ] Copy-paste entire contents of `supabase-schema.sql` file
- [ ] Click "Run"
- [ ] Verify success message

## Step 3: Get API Keys (1 minute)

- [ ] Go to **Settings** → **API** in Supabase dashboard
- [ ] Copy **Project URL** (looks like `https://xxx.supabase.co`)
- [ ] Copy **anon/public key** (long string)

## Step 4: Configure App (2 minutes)

- [ ] Copy `.env.example` to `.env`:
  ```bash
  cp .env.example .env
  ```
- [ ] Edit `.env` and paste your values:
  ```
  VITE_SUPABASE_URL=https://your-project-url.supabase.co
  VITE_SUPABASE_ANON_KEY=your-long-key-here
  ```
- [ ] Save file (do NOT commit to git!)

## Step 5: Configure Email (1 minute, optional for dev)

- [ ] Go to **Authentication** → **Providers** → **Email** in Supabase
- [ ] For development: toggle **Confirm email** OFF
- [ ] For production: keep ON and configure SMTP

## Step 6: Test It Works (5 minutes)

- [ ] Start dev server: `npm run start:dev`
- [ ] Click "Sign Up" in navbar
- [ ] Create test account
- [ ] Start a lesson and answer some lines
- [ ] Sign out
- [ ] Sign back in → verify progress still there
- [ ] (Optional) Open in incognito window, sign in again → see same progress

## ✅ You're Done!

Cloud sync is now active. Users can:

- Continue as guest (local only)
- Sign up for cloud sync
- See progress across all devices

## Next: Configure for Production

When deploying:

1. Set `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in deployment platform
2. Enable email confirmation in Supabase
3. Configure SMTP for transactional emails
4. Monitor usage in Supabase dashboard
5. Consider rate limiting (Authentication → Rate Limits)

## Troubleshooting

| Problem                                  | Solution                                                |
| ---------------------------------------- | ------------------------------------------------------- |
| "Missing Supabase environment variables" | Check `.env` file exists with correct values            |
| Database tables don't exist              | Re-run `supabase-schema.sql` in SQL Editor              |
| Sign up fails                            | Check Supabase logs: **Database** → **Logs**            |
| Data not syncing                         | Verify user is signed in (should see email in navbar)   |
| Email confirmation not working           | For dev, disable confirmation; for prod, configure SMTP |

See `SUPABASE_SETUP.md` for detailed troubleshooting guide.
