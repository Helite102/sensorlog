const express = require('express');
const { MongoClient } = require('mongodb');
const path = require('path');

const app = express();
app.use(express.json());

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  if (req.method === 'OPTIONS') return res.sendStatus(200);
  next();
});

// ─── CONEXIÓN AUTOMÁTICA A MONGODB ATLAS ─────────────
const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://marlonegr606_db_user:Sensor2025@cluster0.kuumsnp.mongodb.net/?appName=Cluster0";
const DB_NAME   = "sensor_db";
const COL_NAME  = "lecturas";

let db;
async function connectDB() {
  try {
    const client = await MongoClient.connect(MONGO_URI);
    db = client.db(DB_NAME);
    console.log('✅ Conectado a MongoDB Atlas — sensor_db');
  } catch (err) {
    console.error('❌ Error MongoDB:', err.message);
    setTimeout(connectDB, 5000);
  }
}
connectDB();

// ─── GUARDAR LECTURA ──────────────────────────────────
app.post('/api/sensor', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'DB no conectada aún' });
    const doc = { ...req.body, servidor_ts: new Date() };
    const result = await db.collection(COL_NAME).insertOne(doc);
    console.log('📍 Guardado:', result.insertedId);
    res.json({ ok: true, insertedId: result.insertedId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── OBTENER ÚLTIMAS LECTURAS ─────────────────────────
app.get('/api/sensor', async (req, res) => {
  try {
    if (!db) return res.status(503).json({ error: 'DB no conectada' });
    const docs = await db.collection(COL_NAME)
      .find({}).sort({ servidor_ts: -1 }).limit(20).toArray();
    res.json(docs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// ─── STATUS ───────────────────────────────────────────
app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', db: db ? 'conectado' : 'desconectado' });
});

app.use(express.static(path.join(__dirname, 'public')));
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`🚀 SensorLog en puerto ${PORT}`));
