const router = require('express').Router();
const db = require('../db');
const { authenticate, requireAdmin } = require('../middleware/auth');
// NOTE: define '/registered' BEFORE '/:id/...' routes.
// TODO: GET / -> all events with a 'registered' count
router.get('/', (req, res) => res.status(501).json({ error: 'TODO' }));
// TODO: GET /registered (auth) -> events the logged-in user registered for
router.get('/registered', (req, res) => res.status(501).json({ error: 'TODO' }));
// TODO: POST /:id/register (auth) -> 404 / 409 (duplicate or full) / 201
router.post('/:id/register', (req, res) => res.status(501).json({ error: 'TODO' }));
module.exports = router;
