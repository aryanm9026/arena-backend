require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./db'); // initialises DB
const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', (_, res) => res.json({ ok: true }));
app.use('/api/auth', require('./routes/auth'));
app.use('/api/admin', require('./routes/admin'));
app.use('/api/events', require('./routes/events'));
app.use('/api/users', require('./routes/users'));

app.use((req, res) => res.status(404).json({ error: 'Not found' }));
const PORT = process.env.PORT || 4000;
app.listen(PORT, () => console.log(`Arena API on http://localhost:${PORT}`));
