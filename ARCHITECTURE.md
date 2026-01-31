# Cloud Sync Architecture Documentation

## System Overview

The authentication and cloud sync system is built on three layers:

```
┌─────────────────────────────────────────────────┐
│           User Interface Layer                   │
│  (AuthModal, AppWrapper, SettingsMenu)         │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────┴──────────────────────────────┐
│        State Management Layer                    │
│  (AuthContext, ThemeContext, useAuth hook)     │
└──────────────────┬──────────────────────────────┘
                   │
┌──────────────────┴──────────────────────────────┐
│      Data Persistence Layer                      │
│  (localStorage + Supabase dual-write)          │
└─────────────────────────────────────────────────┘
```

## Component Architecture

### AuthContext (`src/contexts/AuthContext.tsx`)

**Purpose**: Global authentication state management

**Provides**:
- `user: User | null` - Current authenticated user
- `session: Session | null` - Supabase session object
- `loading: boolean` - Auth state initialization flag
- `signUp(email, password)` - Create account
- `signIn(email, password)` - Login
- `signOut()` - Logout
- `resetPassword(email)` - Password recovery

**Lifecycle**:
1. On mount: Retrieves stored session from localStorage via Supabase
2. Listens to auth state changes via `onAuthStateChange`
3. Creates user settings record on signup
4. Provides auth state to entire app tree

### AuthModal (`src/components/AuthModal/AuthModal.tsx`)

**Purpose**: Combined UI for sign-in, sign-up, and password reset

**Features**:
- Three modes: signin, signup, reset password
- Form validation (email format, password requirements)
- Mode switching without clearing form
- Error/success message display
- "Continue as Guest" option

**Props**:
```typescript
interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultMode?: "signin" | "signup";
}
```

### Storage Sync Utilities (`src/utils/storageSync.ts`)

**Purpose**: Synchronize data between localStorage (offline) and Supabase (cloud)

**Key Functions**:

```typescript
// Dual-write: saves to both localStorage and Supabase
saveLessonProgressSync(user: User | null, set: ManifestSets, lessonId: number, progress: LessonProgress)

// Dual-read: Supabase first, fallback to localStorage
loadLessonProgressSync(user: User | null, set: ManifestSets, lessonId: number): Promise<LessonProgress | null>

// Migrate: Upload all localStorage data to Supabase (one-time)
migrateLocalProgressToSupabase(user: User): Promise<void>

// Settings sync
saveUserSettingsSync(user: User | null, settings: ThemeSettings)
loadUserSettingsSync(user: User | null): Promise<Settings | null>
```

**Dual-Write Strategy**:
1. Always write to localStorage first (fast, always available)
2. If user authenticated, also write to Supabase asynchronously
3. Errors in Supabase don't block UI updates
4. Network failures handled gracefully

**Read Strategy**:
1. If user authenticated, try Supabase first
2. Fall back to localStorage if Supabase fails
3. For guests, always use localStorage

## Data Flow Examples

### Guest User: Answering a Question

```
User Input
    ↓
TranscriptionArea.tsx (captures answer)
    ↓
saveLessonProgress() [localStorage.ts]
    ↓
localStorage.setItem() ← SAVED ✓
```

### Authenticated User: Answering a Question

```
User Input
    ↓
TranscriptionArea.tsx (captures answer)
    ↓
saveLessonProgressSync(user, set, lessonId, progress)
    ↓
┌─────────────────────────┐
│ localStorage.setItem()   │ ← SAVED (instant) ✓
│ (blocking)              │
└─────────────────────────┘
    ↓ (async, non-blocking)
┌─────────────────────────┐
│ Supabase: INSERT/UPDATE │ ← SAVED (cloud) ✓
│ (fire-and-forget)       │
└─────────────────────────┘
```

### User Signs In: Auto-Migration

```
User clicks "Sign In" → AuthModal shows signin form
    ↓
User enters email/password → signIn() called
    ↓
Supabase authenticates user
    ↓
AppWrapper detects user logged in
    ↓
Check migrationKey in localStorage
    ↓
First time? → migrateLocalProgressToSupabase()
    ├─ Read all localStorage keys
    ├─ Parse lesson progress and settings
    ├─ Upload to Supabase (lesson_progress table)
    └─ Upload settings (user_settings table)
    ↓
Set migrationKey → prevents duplicate migration
    ↓
User can now sync across devices
```

### Cross-Device Sync: Resume Lesson

```
Device A: User completes lesson 5
    ↓
saveLessonProgressSync() writes to Supabase
    ↓
Device B: User opens app
    ↓
AppWrapper loads auth state
    ↓
Workspace/Dashboard loads progress
    ↓
loadLessonProgressSync(user, "lessons", 5)
    ├─ Query Supabase for lesson_progress
    ├─ Get most recent answers/status
    └─ Display on Device B
    ↓
User sees same progress as Device A ✓
```

## Database Schema & Security

### Tables

**user_settings** (1:1 mapping to auth.users)
```sql
user_id (PK) → auth.users.id
dark_mode, font_size, high_contrast, reduced_motion
onboarding_seen, celebration_shown
```

**lesson_progress** (many per user)
```sql
id (PK), user_id (FK), lesson_set, lesson_id (unique per user+lesson)
answers (JSONB), status (JSONB), require_spaces
```

### Row Level Security (RLS)

Every table has policies:
```sql
-- Users can ONLY see their own data
SELECT: auth.uid() = user_id
INSERT: auth.uid() = user_id
UPDATE: auth.uid() = user_id
DELETE: auth.uid() = user_id
```

### Indexes for Performance

```sql
lesson_progress(user_id)
lesson_progress(lesson_set)
lesson_progress(user_id, lesson_set, lesson_id)
```

## Error Handling

### Supabase Connection Failures

**Scenario**: Network down when trying to sync

**Behavior**:
1. Warning logged to console
2. localStorage write already completed
3. User sees no UI error
4. Next sync attempt will retry

### RLS Policy Violations

**Scenario**: Malicious client tries to access another user's data

**Behavior**:
1. Supabase rejects query
2. Error returned to client
3. App falls back to localStorage
4. User can continue (worst case: guest mode)

### Migration Conflicts

**Scenario**: User signs in with new email, has local data

**Behavior**:
1. Migration runs, uploads local data
2. Creates new user_settings row
3. Upsert prevents duplicates via unique constraint
4. Latest data wins (by timestamp)

## Performance Considerations

### Client-Side

- **localStorage**: ~5-10ms write, synchronous
- **Supabase**: ~100-500ms write, asynchronous
- **Dual-write**: User sees localStorage response immediately, Supabase is non-blocking

### Server-Side

- **Queries**: Indexed lookups ~5-50ms
- **Inserts/Updates**: ~50-150ms with RLS checks
- **Migrations**: Bulk upsert ~1-5 seconds (depends on lesson count)

### Optimization Tips

1. **Batch writes**: Group multiple lesson saves if needed
2. **Connection pooling**: Supabase handles automatically
3. **Pagination**: If user has 100+ lessons, paginate dashboard
4. **Caching**: Frontend caches user settings in ThemeContext

## Integration Points

### ThemeContext (`src/contexts/ThemeContext.tsx`)

**Before**:
```typescript
// Read-only from localStorage
const settings = localStorage.getItem('transcribe-theme-settings')
```

**After**:
```typescript
// On mount: Load from Supabase if user exists
useEffect(() => {
  if (user) {
    loadUserSettingsSync(user).then(syncedSettings => {
      // Update local state with cloud settings
    })
  }
}, [user])

// On change: Sync to both stores
useEffect(() => {
  saveUserSettingsSync(user, settings)
}, [settings, user])
```

### Workspace/TranscriptionArea

**No code changes required** - already uses `saveLessonProgress()`

**To enable cloud sync**:
1. Wrap with `AuthProvider` ✓ (already done)
2. Use `saveLessonProgressSync` instead of `saveLessonProgress`

**Note**: This can be done incrementally without breaking changes

## Testing Checklist

- [ ] Guest user: Create account, make progress → data in localStorage
- [ ] New user: Sign up → account created, settings row initialized
- [ ] Sign in/out cycle: Credentials work, auth state updates
- [ ] Cross-device: Sign in on Device A, sign in on Device B → same progress
- [ ] Migration: Start as guest, make progress, sign up → data migrated
- [ ] Offline: Disconnect network, answer questions → localStorage updated
- [ ] Error recovery: Sign in, kill network, try to sync → falls back to localStorage
- [ ] Settings sync: Change theme on Device A, sign in on Device B → same theme

## Troubleshooting

### "User not authenticated in Supabase"

**Cause**: Session not persisting between page loads

**Debug**:
1. Check browser localStorage: `localStorage.getItem('transcribe-auth')`
2. Check Supabase dashboard: **Authentication** → **Users**
3. Verify JWT not expired (24-hour default)

**Fix**:
1. Clear browser cache
2. Try signing in again
3. Check Supabase auth configuration

### "Data not syncing to cloud"

**Cause**: RLS policy issue or table structure mismatch

**Debug**:
1. Check browser console for errors
2. Open Supabase dashboard: **Logs** → check for 403 errors
3. Verify table exists: **Table Editor** → view `lesson_progress` and `user_settings`

**Fix**:
1. Re-run `supabase-schema.sql`
2. Verify RLS policies exist
3. Check column names match schema

### "Migration takes too long"

**Cause**: Large amount of localStorage data or slow connection

**Debug**:
1. Monitor Supabase dashboard: **Database** → **Analytics**
2. Check network tab in DevTools

**Optimization**:
1. Batch migrations: Process in 10-lesson chunks
2. Show progress UI: "Migrating X of Y lessons..."
3. Allow background migration: don't block app

## Future Enhancements

1. **Offline-First Sync**: Queue edits when offline, sync when online
2. **Conflict Resolution**: If data diverges, show merge UI
3. **Push Notifications**: Alert user when they have cloud data to pull
4. **Share Progress**: Generate shareable links with read-only access
5. **Analytics**: Track sync metrics, error rates, migration success
6. **Advanced Caching**: Service Worker for offline lesson preview

## Related Files

- Core: [AuthContext](../src/contexts/AuthContext.tsx), [storageSync](../src/utils/storageSync.ts)
- UI: [AuthModal](../src/components/AuthModal/AuthModal.tsx), [AppWrapper](../src/app/AppWrapper/AppWrapper.tsx)
- Config: [supabase.ts](../src/config/supabase.ts), [database.types.ts](../src/config/database.types.ts)
- Schema: [supabase-schema.sql](../supabase-schema.sql)
- Docs: [SUPABASE_SETUP.md](./SUPABASE_SETUP.md), [QUICK_START.md](./QUICK_START.md)
