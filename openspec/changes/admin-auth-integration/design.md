# Design: Admin Auth Integration

Replace simulated admin login with real JWT auth against the backend. `AuthAdminContext` becomes the central auth orchestrator — token lifecycle, session guard, login/logout actions. An axios interceptor handles 401 globally.

## Architecture Decisions

| Option | Choice | Tradeoff | Rationale |
|--------|--------|----------|-----------|
| 401 handling | Axios response interceptor (admin axios instance) | Per-method try/catch vs global catch | Catches all auth failures uniformly. Login endpoint exempted via URL check. |
| Session guard | `AuthAdminProvider` wraps children, renders only when authenticated | Provider becomes a layout wrapper | Single source of truth for auth state. Panel layout clean — just wrap. |
| /me fallback | Throw from interceptor, provider catches | Provider catch runs after redirect initiated | Interceptor clears token + redirects. Provider's catch is a no-op — redirect already in flight. |
| API snake_case | Map `access_token` → `accessToken` in `login()` | Extra mapping step | Avoids changing shared `LoginResponse` type and affecting web app. |
| Token key unification | Use `LOCAL_STORAGE_KEYS.accessToken` everywhere | Existing `adminToken` users re-login | Spec requirement. Acceptable for MVP. |

## Data Flow

```
Login:  POST /auth/login ──► 200 { access_token }
           │
           ▼ localStorage.setItem("ac_token_admin", token)
           ▼ jwtDecode(token) → { id, username, exp }
           ▼ setContext(user, isAuthenticated=true)
           ▼ router.push("/panel") + sileo.success()

Mount:  AuthAdminProvider → localStorage.getItem()
         │
    ┌────┴────┐
    ▼         ▼
  Token    No token
    │       redirect /login
  jwtDecode()
    │
  ┌─┴──────────┐
  ▼            ▼
Valid JWT   Invalid JWT
user=payload  GET /me ──► 200 → user from response
                         ──► 401 → interceptor clears token
                                   window.location = "/"
                                   sileo.error()

Any API 401:  axios interceptor → clear localStorage
               → window.location = "/"
               → sileo.error("Tu sesión ha expirado...")
```

## Interfaces / Contracts

```typescript
// apps/admin/src/types/auth.ts
export interface AdminUser {
  id: number;
  username: string;
  exp?: number;
}

export interface AuthCtxType {
  user: AdminUser | null;
  token: string | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

// Mapping for API snake_case → camelCase
interface LoginResponseRaw {
  access_token: string;
  token_type: string;
  expires_in: number;
}
```

## File Changes

| File | Action | Description |
|------|--------|-------------|
| `types/auth.ts` | Modify | Replace `JwtStructure` with `AdminUser`, extend `AuthCtxType` |
| `context/AuthAdminContext.tsx` | Rewrite | Full provider: login, logout, JWT decode, /me fallback, loading, session guard |
| `libs/apiAdminGanaya.ts` | Modify | Add 401 interceptor, rewrite `login()` for API shape, add `getMe()` |
| `components/admin/login/AdminLogin.tsx` | Modify | Remove simulated auth, call `context.login()`, handle form error |
| `components/admin/login/LoginForm.tsx` | Rewrite | Formik + Yup, `username` field, loading states, inline validation |
| `app/layout.tsx` | Modify | Add `<Toaster position="top-right" theme="dark" />` |
| `app/panel/layout.tsx` | Modify | Wrap children in `<AuthAdminProvider>` |
| `hooks/useAuthAdmin.tsx` | No change | TypeScript inference from context type covers new shape |

## Component Details

**AuthAdminProvider**: On mount → read token → try JWT decode (sync). If valid + not expired → set user. If decode fails → call GET /me → on 401 interceptor handles redirect. During loading renders a spinner. Once loaded, renders children only when authenticated.

**LoginForm (Formik rewrite)**: Fields — `username` (text, label "Usuario"), `password` (password, label "Contraseña"). Yup validation: min 3/max 50 for username, min 6/max 100 for password. Submit button disabled + "Iniciando sesión..." during `isSubmitting`. Server errors shown via Formik `setFieldError`. No `remember` field.

**Axios interceptor**: On 401 response, skip if URL is `/auth/login`. Otherwise: clear localStorage, call `sileo.error()`, `window.location.href = ROUTES.index`. Use a `let redirecting = false` guard to prevent double-redirect.

## Migration Notes

1. **localStorage key**: `AuthAdminContext` currently reads `ADMIN_TOKEN` ("adminToken"). Switch to `LOCAL_STORAGE_KEYS.accessToken` ("ac_token_admin"). Existing sessions with old key must re-login.
2. **API response format**: Backend returns `{ access_token, token_type, expires_in }` — no `{ status, data }` wrapper. Current code assumes the wrapper. Full `login()` rewrite required.
3. **Simulated auth removal**: `AdminLogin`'s 2s delay + console.log removed. `LoginForm`'s `remember` checkbox removed (out of scope).
4. **Form state**: Drop native React state for Formik + Yup. Error display moves from prop to Formik's `errors` object.

## Testing Strategy

| Layer | What | Approach |
|-------|------|----------|
| Unit | Context login/logout/init | Mock localStorage, apiAdminGanaya, router.push |
| Unit | 401 interceptor | Mock axios error response, verify localStorage cleared |
| Integration | Login flow | Render AdminLogin → submit → verify token stored, redirect |
| E2E | Full auth cycle | Login → panel access → refresh → session restored → logout |

## Open Questions

- [ ] Race condition guard in 401 interceptor: use a module-level `let isRedirecting = false` flag with a short cooldown.
