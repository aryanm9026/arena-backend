// Database is READY for you (SQLite, zero setup). Tables are created + seeded on first run.
// You may switch to MySQL/Postgres/MongoDB if you want - but keep the same API contract.
const Database = require('better-sqlite3');
const bcrypt = require('bcryptjs');
const db = new Database(process.env.DB_FILE || 'arena.db');
db.pragma('foreign_keys = ON');
db.exec(`
CREATE TABLE IF NOT EXISTS users (
  id INTEGER PRIMARY KEY AUTOINCREMENT, name TEXT NOT NULL,
  email TEXT NOT NULL UNIQUE, password_hash TEXT NOT NULL,
  role TEXT NOT NULL DEFAULT 'user' CHECK (role IN ('user','admin')));
CREATE TABLE IF NOT EXISTS events (
  id INTEGER PRIMARY KEY AUTOINCREMENT, title TEXT NOT NULL, description TEXT,
  venue TEXT, date TEXT, capacity INTEGER NOT NULL DEFAULT 50);
CREATE TABLE IF NOT EXISTS registrations (
  user_id INTEGER NOT NULL REFERENCES users(id), event_id INTEGER NOT NULL REFERENCES events(id),
  created_at TEXT DEFAULT CURRENT_TIMESTAMP, PRIMARY KEY (user_id, event_id));
`);
if (!db.prepare('SELECT 1 FROM events LIMIT 1').get()) {
  const ins = db.prepare('INSERT INTO events (title,description,venue,date,capacity) VALUES (?,?,?,?,?)');
  [['Hack the Night','12-hour hackathon','Lab 1','2026-11-01',60],['UI Showdown','Design + build a landing page','Hall A','2026-11-02',40],
   ['Bug Bounty Live','Find the planted bugs','Lab 2','2026-11-03',30],['Pitch Perfect','Startup pitch contest','Auditorium','2026-11-04',100]]
   .forEach(e => ins.run(...e));
  db.prepare("INSERT INTO users (name,email,password_hash,role) VALUES ('Admin','admin@arena.dev',?, 'admin')")
    .run(bcrypt.hashSync('Admin@123', 10));
}
module.exports = db;
