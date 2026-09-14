# Tasks: Admin Auth Integration

## Review Workload Forecast

| Field | Value |
|-------|-------|
| Estimated changed lines | ~380 |
| 400-line budget risk | Low |
| Chained PRs recommended | Yes |
| Suggested split | PR 1 (foundation) → PR 2 (integration) |
| Delivery strategy | force-chained |
| Chain strategy | stacked-to-main |

Decision needed before apply: No
Chained PRs recommended: Yes
Chain strategy: stacked-to-main
400-line budget risk: Low

### Suggested Work Units

| Unit | Goal | Likely PR | Notes |
|------|------|-----------|-------|
| 1 | Foundation: types, API client, Toaster | PR 1 | No auth logic yet. Sets up infrastructure. |
| 2 | Auth integration: context, login form, guard | PR 2 | Depends on PR 1. Core auth flow. |

## Phase 1: Foundation (PR 1)

- [ ] 1.1 Update `apps/admin/src/types/auth.ts` — Replace `JwtStructure` with `AdminUser`, extend `AuthCtxType` with `user`, `isAuthenticated`, `isLoading`, `login()`, `logout()`
- [ ] 1.2 Add `getMe()` method to `apps/admin/src/libs/apiAdminGanaya.ts` — `GET /me` returning user data
- [ ] 1.3 Add `logout()` method to `apps/admin/src/libs/apiAdminGanaya.ts` — `POST /auth/logout` with Bearer token, invalidates server-side session
- [ ] 1.4 Add 401 response interceptor to `apiAdminGanaya.ts` axios instance — clear token, redirect to `/login`, `sileo.error()` notification, skip `/auth/login` URL
- [ ] 1.5 Rewrite `login()` in `apiAdminGanaya.ts` — handle raw `{ access_token }` response (no `{ status, data }` wrapper), map snake_case to camelCase
- [ ] 1.6 Add `<Toaster position="top-right" theme="dark" />` to `apps/admin/src/app/layout.tsx`

## Phase 2: Auth Integration (PR 2)

- [ ] 2.1 Rewrite `apps/admin/src/context/AuthAdminContext.tsx` — Full provider: `login()` calls API, stores token, decodes JWT; `logout()` calls `POST /auth/logout` then clears state; on mount: read token → JWT decode → /me fallback → session guard
- [ ] 2.2 Rewrite `apps/admin/src/components/admin/login/LoginForm.tsx` — Formik + Yup, `username` field, `password` field, min 3/max 50 username, min 6/max 100 password, loading state "Iniciando sesión..."
- [ ] 2.3 Update `apps/admin/src/components/admin/login/AdminLogin.tsx` — Remove simulated auth, call `context.login()`, handle error display
- [ ] 2.4 Update `apps/admin/src/app/panel/layout.tsx` — Wrap children in `<AuthAdminProvider>`, add loading spinner while `isLoading`

## Phase 3: Cleanup

- [ ] 3.1 Remove `remember` checkbox from LoginForm (out of scope)
- [ ] 3.2 Remove simulated auth delay and console.log from AdminLogin
- [ ] 3.3 Verify all localStorage reads use `LOCAL_STORAGE_KEYS.accessToken` constant (no hardcoded `adminToken`)
