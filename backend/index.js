const express = require('express');
const cors = require('cors');
const { Pool } = require('pg');

const app = express();
app.use(cors());
app.use(express.json());

const pool = new Pool({
  user: process.env.DB_USER || 'perfumes_user',
  host: process.env.DB_HOST || 'db',
  database: process.env.DB_NAME || 'perfumes_db',
  password: process.env.DB_PASSWORD || 'perfumes_password',
  port: process.env.DB_PORT || 5432,
});

// GET /api/perfumes/search?q=... (Debe ir antes del /:id)
app.get('/api/perfumes/search', async (req, res) => {
  try {
    const { q } = req.query;
    const result = await pool.query(
      'SELECT * FROM perfumes WHERE nombre ILIKE $1 OR marca ILIKE $1 ORDER BY id DESC',
      [`%${q}%`]
    );
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/perfumes
app.get('/api/perfumes', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM perfumes ORDER BY id DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET /api/perfumes/:id
app.get('/api/perfumes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('SELECT * FROM perfumes WHERE id = $1', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Perfume no encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST /api/perfumes
app.post('/api/perfumes', async (req, res) => {
  try {
    const { nombre, marca, genero, precio, volumen_ml, notas_olfativas, stock } = req.body;
    const result = await pool.query(
      'INSERT INTO perfumes (nombre, marca, genero, precio, volumen_ml, notas_olfativas, stock) VALUES ($1, $2, $3, $4, $5, $6, $7) RETURNING *',
      [nombre, marca, genero, precio, volumen_ml, notas_olfativas, stock || 0]
    );
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT /api/perfumes/:id
app.put('/api/perfumes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { nombre, marca, genero, precio, volumen_ml, notas_olfativas, stock } = req.body;
    const result = await pool.query(
      'UPDATE perfumes SET nombre=$1, marca=$2, genero=$3, precio=$4, volumen_ml=$5, notas_olfativas=$6, stock=$7 WHERE id=$8 RETURNING *',
      [nombre, marca, genero, precio, volumen_ml, notas_olfativas, stock, id]
    );
    if (result.rows.length === 0) return res.status(404).json({ message: 'Perfume no encontrado' });
    res.json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// DELETE /api/perfumes/:id
app.delete('/api/perfumes/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const result = await pool.query('DELETE FROM perfumes WHERE id = $1 RETURNING *', [id]);
    if (result.rows.length === 0) return res.status(404).json({ message: 'Perfume no encontrado' });
    res.json({ message: 'Perfume eliminado exitosamente' });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Backend corriendo en el puerto ${PORT}`);
});