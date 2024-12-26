require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3001;

// Middleware
app.use(cors());
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  };
  
//   app.use(cors(corsOptions));
const pool = new Pool({
    user: process.env.PGUSER,
    host: process.env.PGHOST,
    database: process.env.PGDATABASE,
    password: process.env.PGPASSWORD,
    connectionTimeoutMillis: 10000,
    port: process.env.PGPORT,
});

app.get('/courses', async (req, res) => {
 
        const result = await pool.query('SELECT * FROM courses');
        res.json(result.rows);
    
});

app.post('/courses', async (req, res) => {
    const { courseName, courseCode, credits, profName, description, imageURL } = req.body;
    if (!courseName || !courseCode || !credits || !profName || !description) {
        return res.status(400).json({ success: false, message: 'All fields are required' , data: courseCode});
      }
        const result = await pool.query(
            'INSERT INTO courses ("courseName", "imageURL", "courseCode", "profName", "credits", "description") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [courseName, imageURL, courseCode, profName, credits, description]
        );
        res.json(result.rows[0]);
    
});

app.put('/courses/:id', async (req, res) => {
    const { id } = req.params;
    const { courseName, imageURL, courseCode, profName, credits, description } = req.body;
    try {
        const result = await pool.query(
            'UPDATE courses SET "courseName" = $1, "imageURL" = $2, "courseCode" = $3, "profName" = $4, credits = $5, description = $6 WHERE id = $7 RETURNING *',
            [courseName, imageURL, courseCode, profName, credits, description, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.delete('/courses/:id', async (req, res) => {
    const { id } = req.params;
    try {
        await pool.query('DELETE FROM courses WHERE id = $1', [id]);
        res.send('Course deleted');
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
