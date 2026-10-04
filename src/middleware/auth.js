const jwt = require('jsonwebtoken');
// TODO 1: read "Authorization: Bearer <token>", verify with process.env.JWT_SECRET,
//         attach the user to req.user, else respond 401 { error }.
function authenticate(req, res, next) {
  return res.status(501).json({ error: 'TODO: implement authenticate' });
}
// TODO 2: allow only req.user.role === 'admin', else 403 { error }.
function requireAdmin(req, res, next) {
  return res.status(501).json({ error: 'TODO: implement requireAdmin' });
}
module.exports = { authenticate, requireAdmin };
