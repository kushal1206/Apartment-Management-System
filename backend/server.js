const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// ✅ REQUIRE ROUTES (module.exports = router in files)
const flatsRoutes = require('./routes/flats');
const maintenanceRoutes = require('./routes/maintenance');
const authRoutes = require('./routes/auth');

dotenv.config();
connectDB();

const app = express();
app.use(cors({ origin: ['http://localhost:5001', 'http://127.0.0.1:5001'] }));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use('/api/flats', flatsRoutes);
app.use('/api/maintenance', maintenanceRoutes);
app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => console.log(`API running on http://localhost:${PORT}`));
