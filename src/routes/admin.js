const router = require('express').Router();
const db = require('../db');
const { authenticate, requireAdmin } = require('../middleware/auth');
// TODO: GET /stats (admin only) -> { users, events, registrations }
router.get('/stats', (req, res) => res.status(501).json({ error: 'TODO' }));
module.exports = router;
