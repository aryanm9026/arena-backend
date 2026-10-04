# CACS Arena – NodeJS (Backend) Track
**Problem statement:** The Arena app needs a secure backend. Build the REST API described in `API_CONTRACT.md` (Node + Express; SQLite is pre-wired, you may swap DBs).

## Must build (all in `src/`)
1. Register + Login with **bcrypt password hashing** and **JWT** auth
2. **Admin-only** endpoint (role check middleware)
3. Event registration API (no duplicates, respect capacity)
4. GET events  5. GET registered events  6. GET user info

## Run
```bash
cp .env.example .env     # set a real JWT_SECRET
npm install && npm run dev
npm run verify           # self-check (11 automated checks)
```
## Rules of thumb
Validate input · never return password hashes · correct status codes · no secrets in git · clean commits.
Judging rubric is in the organizer deck. Bonus for: rate limiting, input validation lib, tests, Swagger/Postman collection.

## How to submit (read carefully)
1. **Fork** this repo to your own GitHub account.
2. `git clone` your fork, then run `git config core.hooksPath .githooks` (blocks accidental force-push).
3. Create a branch: `git checkout -b submission/<your-name>` and build the features below.
4. Commit regularly with meaningful messages (judges read your history).
5. `git push origin submission/<your-name>` — **never use `--force`/`--force-with-lease`**.
6. Open a **Pull Request** into this repo's `main`. Title: `[TRACK] Full Name - College`.
7. Do not edit `.github/`, `.githooks/` or `scripts/protect.sh`. PRs touching them are disqualified.
> Your PR stays open: organizers score PRs, they are not merged.
