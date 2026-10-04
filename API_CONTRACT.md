# CACS Arena – API Contract (shared by all tracks)
Base URL: `http://localhost:4000` (backend) · All bodies are JSON · Auth header: `Authorization: Bearer <jwt>`
Errors always look like `{ "error": "message" }` with a correct HTTP status (400, 401, 403, 404, 409).

| # | Method & Path | Auth | Body | Success response |
|---|---|---|---|---|
| 1 | POST `/api/auth/register` | – | `{name,email,password}` | `201 {user:{id,name,email,role}}` (409 if email exists) |
| 2 | POST `/api/auth/login` | – | `{email,password}` | `200 {token,user}` (401 on bad creds) |
| 3 | GET `/api/admin/stats` | Admin only | – | `200 {users,events,registrations}` (403 for non-admin) |
| 4 | GET `/api/events` | – | – | `200 {events:[{id,title,description,venue,date,capacity,registered}]}` |
| 5 | POST `/api/events/:id/register` | User | – | `201 {message}` (404 no event, 409 already registered / full) |
| 6 | GET `/api/events/registered` | User | – | `200 {events:[...]}` |
| 7 | GET `/api/users/me` | User | – | `200 {user:{id,name,email,role}}` (never return the password hash) |

Seeded admin for testing: `admin@arena.dev` / `Admin@123`
