# User Authentication & Cloud Sync Setup Guide

This guide explains how to set up Supabase for user authentication and cloud sync functionality.

## Overview

The application now supports user accounts with cloud sync, allowing users to:

- Sign up and sign in with email/password
- Automatically sync lesson progress across devices
- Store settings in the cloud
- Continue as a guest with local-only storage

## Setup Instructions

### 1. Create a Supabase Project

1. Go to [https://supabase.com](https://supabase.com) and sign up/sign in
2. Click "New Project"
3. Fill in:
   - **Project name**: transcribe (or your choice)
   - **Database password**: (generate a strong password and save it)
   - **Region**: (choose closest to your users)
4. Click "Create new project"
5. Wait 2-3 minutes for the project to initialize

### 2. Set Up Database Schema

1. In your Supabase project dashboard, go to **SQL Editor**
2. Click "New Query"
3. Copy and paste the entire contents of `supabase-schema.sql` from the project root
4. Click "Run" or press `Cmd/Ctrl + Enter`
5. Verify success (you should see "Success. No rows returned")

This creates:

- `user_settings` table for theme preferences
- `lesson_progress` table for transcription data
- Row Level Security (RLS) policies ensuring users can only access their own data
- Indexes for optimal query performance

### 3. Configure Environment Variables

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL**: (looks like `https://xxx.supabase.co`)
   - **anon/public key**: (long string starting with `eyJ...`)

3. Create a `.env` file in the project root (copy from `.env.example`):

```bash
cp .env.example .env
```

4. Edit `.env` and add your values:

```bash
VITE_SUPABASE_URL=https://your-project-url.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

⚠️ **Important**: Never commit `.env` to git. It's already in `.gitignore`.

### 4. Configure Email Authentication

By default, Supabase requires email confirmation. For development, you can disable this:

1. Go to **Authentication** → **Providers** → **Email**
2. Toggle OFF "Confirm email"
3. Click "Save"

For production, keep email confirmation enabled and configure:

- SMTP settings under **Authentication** → **Email Templates**
- Customize email templates as needed

### 5. Account Deletion

The app includes a self-service account deletion flow. This requires a Postgres function
that deletes user-owned rows and the auth user record.

1. In your Supabase project dashboard, go to **SQL Editor**
2. Click "New Query"
3. Run the function below (or re-run `supabase-schema.sql`):

```sql
CREATE OR REPLACE FUNCTION delete_user()
RETURNS void
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
   _uid uuid;
BEGIN
   _uid := auth.uid();

   DELETE FROM public.lesson_progress WHERE user_id = _uid;
   DELETE FROM public.user_settings WHERE user_id = _uid;
   DELETE FROM auth.users WHERE id = _uid;
END;
$$;
```

4. Confirm the function exists in **Database → Functions**

**Client behavior:** the app calls `supabase.rpc('delete_user')`, then signs out globally and
redirects to a confirmation screen.

### 6. Test the Setup

1. Start the development server:

```bash
npm run start:dev
```

2. Open the app in your browser
3. Click "Sign Up" in the navigation bar
4. Create a test account
5. Verify you can:
   - Sign in/out
   - Start a lesson and see progress saved
   - Sign out and back in to verify data persists
   - Open in a different browser/device (after signing in) to see synced data

## Architecture

### Authentication Flow

1. **AuthContext** (`src/contexts/AuthContext.tsx`):
   - Wraps entire app
   - Manages auth state (user, session, loading)
   - Provides `signUp`, `signIn`, `signOut`, `resetPassword` functions

2. **AuthModal** (`src/components/AuthModal/AuthModal.tsx`):
   - Sign in/up/password reset UI
   - Handles form validation
   - Shows success/error messages

3. **AppWrapper** integration:
   - Shows "Sign In" / "Sign Up" buttons when logged out
   - Shows user email + "Sign Out" when logged in
   - Triggers automatic migration of localStorage data on first sign-in

### Data Sync

**Dual-storage strategy**: All data is written to both localStorage (for offline/guest access) and Supabase (for authenticated users).

**Storage utilities** (`src/utils/storageSync.ts`):

- `saveLessonProgressSync()` - Save progress to both stores
- `loadLessonProgressSync()` - Load from Supabase first, fall back to localStorage
- `clearLessonProgressSync()` - Clear from both stores
- `saveUserSettingsSync()` - Save theme settings
- `loadUserSettingsSync()` - Load theme settings
- `migrateLocalProgressToSupabase()` - One-time migration of localStorage data

### Migration Strategy

When a user signs in for the first time:

1. System checks if migration has already run (via `transcribe-migration-{userId}` flag)
2. If not, reads all localStorage progress data
3. Uploads to Supabase under user's account
4. Sets migration flag to prevent duplicate runs

This allows users to:

- Start as guest
- Make progress locally
- Sign up later and keep all their progress

## Database Schema

### `user_settings`

```sql
user_id UUID PRIMARY KEY
dark_mode BOOLEAN
font_size TEXT ('S'|'M'|'L')
high_contrast BOOLEAN
reduced_motion BOOLEAN
onboarding_seen BOOLEAN
celebration_shown BOOLEAN
created_at TIMESTAMPTZ
updated_at TIMESTAMPTZ
```

### `lesson_progress`

```sql
id UUID PRIMARY KEY
user_id UUID (FK to auth.users)
lesson_set TEXT (e.g., "lessons", "UoEDiv")
lesson_id TEXT
answers JSONB (line_number → user_input)
status JSONB (line_number → CORRECT|INCORRECT|INCOMPLETE)
require_spaces BOOLEAN
updated_at TIMESTAMPTZ
created_at TIMESTAMPTZ

UNIQUE(user_id, lesson_set, lesson_id)
```

### `delete_user()`

```sql
delete_user() RETURNS void
```

Deletes the authenticated user's rows from `lesson_progress` and `user_settings`, then
removes the user from `auth.users`.

## Row Level Security (RLS)

All tables have RLS enabled with policies:

- Users can only SELECT/INSERT/UPDATE/DELETE their own data
- Enforced via `auth.uid() = user_id` checks
- Prevents data leaks between users

## Guest vs. Authenticated Users

| Feature           | Guest (No Account)          | Authenticated User       |
| ----------------- | --------------------------- | ------------------------ |
| Lesson progress   | ✅ Saved locally            | ✅ Synced to cloud       |
| Theme settings    | ✅ Saved locally            | ✅ Synced to cloud       |
| Cross-device sync | ❌                          | ✅                       |
| Data persistence  | Local only (can be cleared) | Permanent (cloud backup) |

## Troubleshooting

### "Missing Supabase environment variables" error

**Cause**: `.env` file is missing or variables not set

**Fix**:

1. Ensure `.env` exists in project root
2. Verify `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` are set
3. Restart dev server after editing `.env`

### "Failed to sync lesson progress to Supabase" warnings

**Cause**: RLS policies not set up or database schema missing

**Fix**:

1. Re-run `supabase-schema.sql` in SQL Editor
2. Check Supabase logs: **Database** → **Logs**
3. Verify tables exist: **Table Editor**

### Email confirmation not working

**Cause**: SMTP not configured or confirmation link broken

**Fix** (development):

1. Disable email confirmation (see step 4 above)
2. For production, configure SMTP under **Authentication** → **Email Templates**

### Data not syncing across devices

**Cause**: User not signed in or migration didn't run

**Fix**:

1. Verify user is signed in (email should show in navbar)
2. Check browser console for errors
3. Clear `transcribe-migration-{userId}` from localStorage and refresh to re-trigger migration

## Security Best Practices

1. ✅ **Never commit `.env`** - Already in `.gitignore`
2. ✅ **Use RLS policies** - Already implemented
3. ✅ **Anon key is safe to expose** - Supabase RLS protects data even with public key
4. ⚠️ **Enable email confirmation** in production
5. ⚠️ **Rate limit auth endpoints** - Configure in Supabase dashboard → **Authentication** → **Rate Limits**
6. ⚠️ **Use strong passwords** - Enforce via validation (currently 6+ chars, consider increasing)

## Support

- Supabase docs: https://supabase.com/docs
- Discord: https://discord.supabase.com
