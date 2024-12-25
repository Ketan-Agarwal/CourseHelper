require('dotenv').config();
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { Pool } = require('pg');

const app = express();
const port = 3001;

// Middleware
// app.use(cors());
app.use(express.json());
const corsOptions = {
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type'],
  };
  
//   app.use(cors(corsOptions));
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    connectionTimeoutMillis: 10000,
    port: process.env.DB_PORT,
    ssl: {
        rejectUnauthorized: false,
    },

});

app.get('/courses', async (req, res) => {
    try {
        const result = await pool.query('SELECT * FROM courses');
        res.json(result.rows);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Create a new course
app.post('/courses', async (req, res) => {
    const { courseName, courseCode, credits, profName, description, imageURL } = req.body;
    if (!courseName || !courseCode || !credits || !profName || !description) {
        return res.status(400).json({ success: false, message: 'All fields are required' });
      }
    console.log(req.body)
        const result = await pool.query(
            'INSERT INTO courses ("courseName", "imageURL", "courseCode", "profName", "credits", "description") VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
            [courseName, imageURL, courseCode, profName, credits, description]
        );
        res.json(result.rows[0]);
    
});

// Update a course
app.put('/courses/:id', async (req, res) => {
    const { id } = req.params;
    const { course_name, image_url, course_code, prof_name, credits, description } = req.body;
    try {
        const result = await pool.query(
            'UPDATE courses SET course_name = $1, image_url = $2, course_code = $3, prof_name = $4, credits = $5, description = $6 WHERE id = $7 RETURNING *',
            [course_name, image_url, course_code, prof_name, credits, description, id]
        );
        res.json(result.rows[0]);
    } catch (err) {
        console.error(err);
        res.status(500).send('Server error');
    }
});

// Delete a course
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
