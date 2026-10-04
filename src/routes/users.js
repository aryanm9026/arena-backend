const router = require('express').Router();
const db = require('../db');
const { authenticate, requireAdmin } = require('../middleware/auth');
// TODO: GET /me (auth) -> { user } without password hash
router.get('/me', (req, res) => res.status(501).json({ error: 'TODO' }));
module.exports = router;
