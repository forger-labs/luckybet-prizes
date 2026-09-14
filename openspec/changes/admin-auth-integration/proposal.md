# Proposal: Admin Auth Integration

## Intent

Replace simulated admin login with real authentication against luckybet-premios-backend (`/auth/login` + `/me`). Users log in with username/password, receive a JWT, and sessions persist across refreshes.

## Scope

### In Scope
- Real login flow (Formik + Yup → POST /auth/login → JWT → localStorage)
- AuthAdminContext with `login()`, `logout()`, `user`, `token`
- `/me` fallback on page refresh when JWT exists but user data is lost
- 401/expired-token redirect to `/` with sileo notification
- Mount `<Toaster />` in root layout
- LoginForm: `email` → `username` field

### Out of Scope
- Registration, password reset, MFA, refresh token rotation, role-based access, `apps/web` changes

## Capabilities

### New Capabilities
- `admin-auth`: Admin authentication flow — login form, JWT management, session guard, `/me` fallback, logout, auth error handling

### Modified Capabilities
- `admin-layout`: REQ-LAYOUT-001 session guard moves from `layout.tsx` to `AuthAdminProvider`; redirect from `/` → `/login`

## Approach

1. **AuthAdminContext**: extend to `login(username, password)`, `logout()`, `user`, `token`. On mount: if token in localStorage → decode JWT (`id`, `username`, `exp`) for user info. If decode fails (expired) → call `GET /me` with token. If both fail → redirect to `/login` with sileo error.
2. **AdminLogin.tsx**: swap simulated auth for real `login()` from context. Use Formik + Yup for form state + validation.
3. **Panel layout**: wrap in `AuthAdminProvider`. Provider handles session guard, layout renders children only when authenticated.
4. **401 handling**: check API response in `apiAdminGanaya` calls; on 401, clear token + redirect + notify.
5. **Toast mount**: add `<Toaster />` to root layout.
6. **Token key**: unify localStorage key to `LOCAL_STORAGE_KEYS.accessToken` (`"ac_token_admin"`) across AuthAdminContext and HttpClient.

## Affected Areas

| Area | Impact | Description |
|------|--------|-------------|
| `apps/admin/src/context/AuthAdminContext.tsx` | Modified | Full provider: login, logout, user, token, /me fallback |
| `apps/admin/src/types/auth.ts` | Modified | Extend with login params, user, context shape |
| `apps/admin/src/components/admin/login/AdminLogin.tsx` | Modified | Real auth via context, Formik wiring |
| `apps/admin/src/components/admin/login/LoginForm.tsx` | Modified | email→username, Formik+Yup integration |
| `apps/admin/src/app/panel/layout.tsx` | Modified | Wrap children in AuthAdminProvider |
| `apps/admin/src/app/layout.tsx` | Modified | Add `<Toaster />` |
| `apps/admin/src/hooks/useAuthAdmin.tsx` | Modified | Return full auth state |

## Risks

| Risk | Likelihood | Mitigation |
|------|------------|------------|
| localStorage key mismatch (`adminToken` vs `ac_token_admin`) | High | Unify on `LOCAL_STORAGE_KEYS.accessToken` |
| JWT payload format differs from expected `{id, username, exp}` | Medium | Validate on first decode, fail gracefully |
| No refresh token rotation → re-login after expiry | Low | Acceptable MVP tradeoff; /me covers hard refresh |

## Rollback Plan

Revert all 7 files. Login reverts to simulated 2s delay. No data migration, no DB changes.

## Dependencies

- `luckybet-premios-backend` running at `API_URL` with `/auth/login` and `/me` endpoints
- Formik, Yup, sileo already installed

## Success Criteria

- [ ] Valid credentials → login succeeds → redirect to `/panel`
- [ ] Invalid credentials → error shown in form, no redirect
- [ ] Expired/401 token → redirected to `/` with sileo error notification
- [ ] Page refresh on `/panel` while authenticated → session restored via `/me`
- [ ] Logout clears token, redirects to `/`
