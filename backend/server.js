import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

import flatsRoutes from './routes/flatsRoutes.js';
import maintenanceRoutes from './routes/maintenanceRoutes.js';
import authRoutes from './routes/authRoutes.js';

dotenv.config();
await connectDB();

const app = express();
app.use(cors({
  origin:
    'http://localhost:3000' , credential: true,
  methods: ["GET","POST","PUT","DELETE","PATCH","OPTIONS"],
  allowedHeaders: ["Content-Type","Authorization"],
}));
app.use(express.json());

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.use('/flats', flatsRoutes);
app.use('/maintenance', maintenanceRoutes);
app.use('/auth', authRoutes);

const PORT = process.env.PORT || 5001;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`API running on http://localhost:${PORT}`);
});
