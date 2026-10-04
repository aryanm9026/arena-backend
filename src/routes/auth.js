const router = require('express').Router();
const db = require('../db');
const { authenticate, requireAdmin } = require('../middleware/auth');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
// TODO: POST /register -> validate input, hash password (bcrypt), insert user, 201 (409 if email exists)
router.post('/register', (req, res) => res.status(501).json({ error: 'TODO' }));
// TODO: POST /login -> verify password, return { token, user } (JWT with expiry), 401 on failure
router.post('/login', (req, res) => res.status(501).json({ error: 'TODO' }));
module.exports = router;
