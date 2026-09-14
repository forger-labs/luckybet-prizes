# Delta Spec: Admin Auth Integration

**Change:** admin-auth-integration  
**Type:** Mixed (New Capability: admin-auth | Modified Capability: admin-layout)  
**Generated:** 2025-07-20

---

## API Contracts

### POST /auth/login

**Request**
```json
{
  "username": "string (required, min: 3, max: 50)",
  "password": "string (required, min: 6, max: 100)"
}
```

**Response (200 OK)**
```json
{
  "access_token": "string (JWT)",
  "token_type": "Bearer",
  "expires_in": "number (seconds)"
}
```

**Response (401 Unauthorized)**
```json
{
  "statusCode": 401,
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

**Response (400 Bad Request)**
```json
{
  "statusCode": 400,
  "message": ["username must be a string", "password must be longer than or equal to 6 characters"],
  "error": "Bad Request"
}
```

### POST /auth/logout

**Headers**
```
Authorization: Bearer <access_token>
```

**Response (200 OK)**
```json
{
  "message": "Sesión cerrada correctamente"
}
```

**Response (401 Unauthorized)**
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

### GET /me

**Headers**
```
Authorization: Bearer <access_token>
```

**Response (200 OK)**
```json
{
  "id": "number",
  "username": "string",
  "email": "string",
  "roles": ["string"],
  "isActive": "boolean",
  "createdAt": "ISO 8601 date",
  "updatedAt": "ISO 8601 date"
}
```

**Response (401 Unauthorized)**
```json
{
  "statusCode": 401,
  "message": "Unauthorized",
  "error": "Unauthorized"
}
```

**Response (403 Forbidden)**
```json
{
  "statusCode": 403,
  "message": "Forbidden resource",
  "error": "Forbidden"
}
```

### JWT Payload Structure (Expected)
```json
{
  "id": "number",
  "username": "string",
  "exp": "number (unix timestamp)",
  "iat": "number (unix timestamp)"
}
```

### LocalStorage Key
- Key: `ac_token_admin` (via `LOCAL_STORAGE_KEYS.accessToken`)

---

## Functional Requirements

### NEW Requirements (admin-auth capability)

#### REQ-AUTH-001: Login Form Submission

| Property | Value |
|----------|-------|
| Priority | Critical |
| Method | `POST /auth/login` via `apiAdminGanaya` |

The login form MUST submit username and password to `/auth/login` via the admin HTTP client. On success, the JWT `access_token` MUST be stored in `localStorage` under key `ac_token_admin`. On failure, the form MUST display the server error message.

**Scenario: Valid credentials**
- GIVEN the user is on `/login`
- AND the user enters valid username and password
- WHEN the user submits the form
- THEN the request is sent to `POST /auth/login`
- AND on 200 response, the token is stored in `localStorage['ac_token_admin']`
- AND the user is redirected to `/panel`
- AND a success notification is shown via sileo

**Scenario: Invalid credentials**
- GIVEN the user is on `/login`
- AND the user enters invalid username or password
- WHEN the user submits the form
- THEN the request returns 401
- AND the form displays "Credenciales inválidas" error message
- AND no redirect occurs
- AND no token is stored

**Scenario: Validation error on submit**
- GIVEN the user is on `/login`
- AND the user submits empty or invalid fields
- WHEN Formik validation runs
- THEN the form shows inline validation errors
- AND no API request is made

#### REQ-AUTH-002: AuthAdminContext Provider

| Property | Value |
|----------|-------|
| Priority | Critical |
| State | `user: User | null`, `token: string | null`, `isLoading: boolean`, `isAuthenticated: boolean` |

The `AuthAdminProvider` MUST expose `login(username, password)`, `logout()`, `user`, `token`, `isAuthenticated`, and `isLoading`. On mount, if a token exists in localStorage, the provider MUST decode the JWT payload to extract `user` info. If decode fails (expired/malformed), the provider MUST call `GET /me` with the token to restore session. If both fail, the token MUST be cleared and user redirected to `/login` with sileo error notification.

**Scenario: Session restored from JWT decode on mount**
- GIVEN the user has a valid JWT in `localStorage['ac_token_admin']`
- AND the JWT payload contains valid `id`, `username`, `exp`
- WHEN the app mounts
- THEN the JWT is decoded synchronously
- AND `user` state is populated from payload
- AND `isAuthenticated` is `true`
- AND `isLoading` becomes `false`

**Scenario: Session restored via /me fallback**
- GIVEN the user has a token in localStorage
- BUT the JWT is expired or malformed
- WHEN the app mounts
- THEN JWT decode fails
- AND `GET /me` is called with the token
- AND on 200 response, `user` is populated from `/me` response
- AND `isAuthenticated` is `true`

**Scenario: Session restoration fails completely**
- GIVEN the user has an invalid/expired token in localStorage
- AND `GET /me` returns 401 or fails
- WHEN the app mounts
- THEN the token is cleared from localStorage
- AND `isAuthenticated` is `false`
- AND user is redirected to `/login`
- AND sileo error notification "Sesión expirada, inicia sesión de nuevo" is shown

#### REQ-AUTH-003: Login Action

| Property | Value |
|----------|-------|
| Priority | Critical |
| Method | Context `login(username, password)` |

The `login` function from context MUST call `POST /auth/login`, store the token, decode the JWT for user info, set `user` and `isAuthenticated`, and return the response. On error, it MUST throw an error with the server message.

**Scenario: Successful login via context**
- GIVEN the user calls `login('admin', 'password123')`
- WHEN the API returns 200 with token
- THEN token is stored in localStorage
- AND `user` is set from decoded JWT
- AND `isAuthenticated` becomes `true`
- AND function returns the login response

**Scenario: Failed login via context**
- GIVEN the user calls `login('admin', 'wrong')`
- WHEN the API returns 401
- THEN function throws error with message "Credenciales inválidas"
- AND `isAuthenticated` remains `false`
- AND no token is stored

#### REQ-AUTH-004: Logout Action

| Property | Value |
|----------|-------|
| Priority | Critical |
| Method | Context `logout()` |

The `logout` function MUST call `POST /auth/logout` to invalidate the server-side session, then clear the token from localStorage, set `user` to `null`, `isAuthenticated` to `false`, and redirect to `/login`. A sileo success notification "Sesión cerrada correctamente" MUST be shown. The `/auth/logout` API call should be best-effort — if it fails, the client-side cleanup should still proceed.

**Scenario: User logs out**
- GIVEN the user is authenticated
- WHEN the user clicks logout
- THEN `POST /auth/logout` is called (best-effort)
- AND `localStorage['ac_token_admin']` is removed
- AND `user` becomes `null`
- AND `isAuthenticated` becomes `false`
- AND user is redirected to `/login`
- AND sileo success notification is shown
- AND cleanup proceeds even if the API call fails

#### REQ-AUTH-005: 401 Interceptor on API Calls

| Property | Value |
|----------|-------|
| Priority | Critical |
| Location | `apiAdminGanaya` interceptor |

The admin HTTP client (`apiAdminGanaya`) MUST intercept all responses. On 401 status, the interceptor MUST clear the token from localStorage, set `isAuthenticated` to `false` via context, redirect to `/login`, and show sileo error "Tu sesión ha expirado, por favor inicia sesión de nuevo".

**Scenario: 401 on authenticated request**
- GIVEN the user is on `/panel/misiones` with valid token
- WHEN any API call returns 401
- THEN the interceptor clears the token
- AND redirects to `/login`
- AND sileo error notification is shown
- AND the user cannot access panel routes

**Scenario: 401 on /me fallback call**
- GIVEN the app mounts with expired token
- WHEN `GET /me` returns 401
- THEN the interceptor clears the token
- AND redirects to `/login` with sileo error

#### REQ-AUTH-006: Login Form - Username Field

| Property | Value |
|----------|-------|
| Priority | High |
| Field | `username` (replaces `email`) |

The login form MUST use a `username` field instead of `email`. The label MUST read "Usuario". The field MUST be required.

**Scenario: Username field renders correctly**
- GIVEN the login form renders
- THEN the field label is "Usuario"
- AND the input type is `text`
- AND the field name is `username`

#### REQ-AUTH-007: Login Form - Password Field

| Property | Value |
|----------|-------|
| Priority | High |
| Field | `password` |

The password field MUST be required, type `password`, with label "Contraseña".

**Scenario: Password field renders correctly**
- GIVEN the login form renders
- THEN the field label is "Contraseña"
- AND the input type is `password`
- AND the field name is `password`

#### REQ-AUTH-008: Loading State During Login

| Property | Value |
|----------|-------|
| Priority | Medium |
| State | `isSubmitting` from Formik |

The login button MUST show a loading spinner and be disabled while `isSubmitting` is true. The button text MUST change to "Iniciando sesión...".

**Scenario: Loading state during submit**
- GIVEN the user submits valid credentials
- WHEN the API request is in flight
- THEN the submit button is disabled
- AND shows a spinner
- AND text reads "Iniciando sesión..."

#### REQ-AUTH-009: Sileo Toast Container

| Property | Value |
|----------|-------|
| Priority | High |
| Location | `apps/admin/src/app/layout.tsx` |

The root layout MUST render `<Toaster />` from `sileo` to display notifications globally.

**Scenario: Toast container mounted**
- GIVEN the app loads
- THEN `<Toaster />` is present in the root layout
- AND notifications appear in the top-right corner

#### REQ-AUTH-010: LocalStorage Key Unification

| Property | Value |
|----------|-------|
| Priority | Critical |
| Key | `LOCAL_STORAGE_KEYS.accessToken` = `"ac_token_admin"` |

All token storage/retrieval MUST use the unified key from `LOCAL_STORAGE_KEYS.accessToken`. No hardcoded strings allowed.

**Scenario: Token stored with unified key**
- GIVEN login succeeds
- THEN `localStorage.setItem('ac_token_admin', token)` is called

**Scenario: Token read with unified key**
- GIVEN the app mounts
- THEN `localStorage.getItem('ac_token_admin')` is called

---

### MODIFIED Requirements (admin-layout capability)

#### REQ-LAYOUT-001: Session Guard (MODIFIED)

| Property | Value |
|----------|-------|
| Priority | High |
| Method | `AuthAdminProvider` guard (context-based) |
| Previously | `layout.tsx` guard (parent layout check) |

**Previous Requirement Text:**
> The admin layout MUST redirect unauthenticated users to `/login` before rendering any panel content. Session state MUST be checked on mount and on route change.

**Updated Requirement Text:**
> The `AuthAdminProvider` MUST act as the session guard for all panel routes. It MUST check authentication state on mount and on token changes. Unauthenticated users MUST be redirected to `/login` before any panel content renders. The panel layout (`/panel/layout.tsx`) MUST wrap children in `AuthAdminProvider` and only render children when `isAuthenticated` is true and `isLoading` is false.

**Scenario: Unauthenticated user redirected (UPDATED)**
- GIVEN the user is NOT authenticated
- WHEN they navigate to `/panel/misiones`
- THEN `AuthAdminProvider` detects unauthenticated state
- AND redirects to `/login`
- AND the panel content is NOT rendered

**Scenario: Authenticated user sees panel (UPDATED)**
- GIVEN the user IS authenticated
- WHEN they navigate to `/panel/*`
- THEN `AuthAdminProvider` renders children
- AND the layout renders the sidebar and content area

**Scenario: Loading state during auth check**
- GIVEN the app is checking auth state on mount
- WHEN `isLoading` is true
- THEN a loading skeleton/spinner is shown
- AND no redirect occurs until `isLoading` is false

---

## Scenarios Summary

| ID | Scenario | Capability | Type |
|----|----------|------------|------|
| SC-01 | Valid credentials login | admin-auth | Happy path |
| SC-02 | Invalid credentials | admin-auth | Error |
| SC-03 | Empty/invalid form validation | admin-auth | Edge case |
| SC-04 | Session restore from JWT decode | admin-auth | Happy path |
| SC-05 | Session restore via /me fallback | admin-auth | Edge case |
| SC-06 | Session restore fails completely | admin-auth | Error |
| SC-07 | Logout clears session | admin-auth | Happy path |
| SC-08 | 401 on API call triggers logout | admin-auth | Error |
| SC-09 | 401 on /me fallback triggers logout | admin-auth | Error |
| SC-10 | Username field replaces email | admin-auth | Modified |
| SC-11 | Loading state during submit | admin-auth | UX |
| SC-12 | Toast container mounted | admin-auth | Infrastructure |
| SC-13 | LocalStorage key unification | admin-auth | Infrastructure |
| SC-14 | Unauthenticated redirect via provider | admin-layout | Modified |
| SC-15 | Authenticated panel render via provider | admin-layout | Modified |
| SC-16 | Loading skeleton during auth check | admin-layout | New |

---

## Data Flow

### Login Flow
```
User submits login form
       │
       ▼
Formik validates (Yup schema)
       │
       ├── Invalid ──► Show inline errors
       │
       ▼ Valid
Context.login(username, password)
       │
       ▼
POST /auth/login (apiAdminGanaya)
       │
       ├── 401 ──► Throw error → Form shows "Credenciales inválidas"
       │
       ▼ 200 OK
Store token in localStorage['ac_token_admin']
       │
       ▼
Decode JWT payload (id, username, exp)
       │
       ▼
Set context: user={id, username}, isAuthenticated=true, isLoading=false
       │
       ▼
Router.push('/panel')
       │
       ▼
Show sileo success: "Bienvenido, {username}"
```

### Page Refresh Flow (Session Restoration)
```
App mounts (layout.tsx)
       │
       ▼
AuthAdminProvider mounts
       │
       ▼
isLoading = true
       │
       ▼
Read token from localStorage['ac_token_admin']
       │
       ├── No token ──► isAuthenticated=false, isLoading=false, redirect to /login
       │
       ▼ Token exists
Try decode JWT payload
       │
       ├── Valid & not expired ──► Set user from payload, isAuthenticated=true, isLoading=false
       │
       ▼ Invalid/expired
Call GET /me with Authorization: Bearer <token>
       │
       ├── 200 OK ──► Set user from response, isAuthenticated=true, isLoading=false
       │
       ▼ 401/403/Error
Clear localStorage token
       │
       ▼
isAuthenticated=false, isLoading=false
       │
       ▼
Redirect to /login
       │
       ▼
Show sileo error: "Sesión expirada, inicia sesión de nuevo"
```

### Logout Flow
```
User clicks logout
       │
       ▼
Context.logout() called
       │
       ▼
POST /auth/logout (best-effort — fire & forget)
       │
       ├── 200 ──► Continue cleanup
       │
       ▼ (regardless of success/failure)
Clear localStorage['ac_token_admin']
       │
       ▼
Set context: user=null, isAuthenticated=false, isLoading=false
       │
       ▼
Router.push('/')
       │
       ▼
Show sileo success: "Sesión cerrada correctamente"
```

### 401 Interception Flow
```
Any API call via apiAdminGanaya
       │
       ▼
Response received
       │
       ├── 2xx ──► Return response
       │
       ▼ 401
Interceptor catches response
       │
       ▼
Clear localStorage['ac_token_admin']
       │
       ▼
Call context logout() or set isAuthenticated=false
       │
       ▼
Router.push('/login')
       │
       ▼
Show sileo error: "Tu sesión ha expirado, por favor inicia sesión de nuevo"
```

---

## Validation Rules (Formik + Yup)

### Login Form Schema
```typescript
import * as Yup from 'yup';

export const loginSchema = Yup.object().shape({
  username: Yup.string()
    .required('El usuario es requerido')
    .min(3, 'El usuario debe tener al menos 3 caracteres')
    .max(50, 'El usuario no puede exceder 50 caracteres'),
  password: Yup.string()
    .required('La contraseña es requerida')
    .min(6, 'La contraseña debe tener al menos 6 caracteres')
    .max(100, 'La contraseña no puede exceder 100 caracteres'),
});
```

### Field Specifications

| Field | Type | Required | Min | Max | Pattern | Error Messages |
|-------|------|----------|-----|-----|---------|----------------|
| username | text | Yes | 3 | 50 | - | Required, Min 3, Max 50 |
| password | password | Yes | 6 | 100 | - | Required, Min 6, Max 100 |

---

## Notification Rules (sileo)

| Trigger | Type | Title | Message | Position | Duration |
|---------|------|-------|---------|----------|----------|
| Login success | success | "Bienvenido" | "Bienvenido, {username}" | top-right | 4000ms |
| Invalid credentials | error | "Error" | "Credenciales inválidas" | top-right | 5000ms |
| Session expired (mount) | error | "Sesión expirada" | "Sesión expirada, inicia sesión de nuevo" | top-right | 5000ms |
| 401 on API call | error | "Sesión expirada" | "Tu sesión ha expirado, por favor inicia sesión de nuevo" | top-right | 5000ms |
| Logout success | success | "Sesión cerrada" | "Sesión cerrada correctamente" | top-right | 3000ms |
| Network error | error | "Error de conexión" | "No se pudo conectar al servidor" | top-right | 5000ms |

### Toast Configuration
```typescript
// sileo Toaster props in layout.tsx
<Toaster
  position="top-right"
  toastOptions={{
    duration: 4000,
    style: { background: '#1e293b', color: '#f8fafc' },
    success: { iconTheme: { primary: '#8ed5ff', secondary: '#0b1326' } },
    error: { iconTheme: { primary: '#ffb4ab', secondary: '#0b1326' } },
  }}
/>
```

---

## Affected Files

| File | Capability | Change Type |
|------|------------|-------------|
| `apps/admin/src/types/auth.ts` | admin-auth | Modified (extended) |
| `apps/admin/src/context/AuthAdminContext.tsx` | admin-auth | Modified (full rewrite) |
| `apps/admin/src/components/admin/login/AdminLogin.tsx` | admin-auth | Modified |
| `apps/admin/src/components/admin/login/LoginForm.tsx` | admin-auth | Modified |
| `apps/admin/src/app/panel/layout.tsx` | admin-layout | Modified (wrap with provider) |
| `apps/admin/src/app/layout.tsx` | admin-auth | Modified (add Toaster) |
| `apps/admin/src/hooks/useAuthAdmin.tsx` | admin-auth | Modified (return full state) |

---

## Risks

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| localStorage key mismatch (`adminToken` vs `ac_token_admin`) | High | High | Unify on `LOCAL_STORAGE_KEYS.accessToken` constant |
| JWT payload format differs from expected `{id, username, exp}` | Medium | High | Validate payload shape on decode, fallback to `/me` |
| No refresh token rotation → forced re-login after expiry | Low | Medium | Acceptable for MVP; `/me` handles hard refresh |
| Race condition: multiple 401s triggering multiple redirects | Medium | Medium | Guard with `isLoggingOut` flag in context |
| /me endpoint returns different shape than JWT payload | Medium | Medium | Normalize user shape in context after both sources |

---

## Success Criteria

- [ ] Valid credentials → login succeeds → redirect to `/panel`
- [ ] Invalid credentials → error shown in form, no redirect
- [ ] Expired/401 token → redirected to `/` with sileo error notification
- [ ] Page refresh on `/panel` while authenticated → session restored via `/me`
- [ ] Logout clears token, redirects to `/`
- [ ] Form validation works with Yup schema (username min 3, password min 6)
- [ ] Toast notifications appear for all success/error states
- [ ] Loading state shown during login submission
- [ ] localStorage key unified to `ac_token_admin` everywhere