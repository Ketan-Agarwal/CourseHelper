const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../db/db');

const generateToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: process.env.JWT_EXPIRATION });
};

const registerUser = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        await db.query('INSERT INTO public.auth (username, password_hash, email) VALUES ($1, $2, $3)', [username, hashedPassword, email]);
        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        if (error.code === '23505') {
            return res.status(400).json({ message: 'Username/email already exists' });
        }
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await db.query('SELECT * FROM public.auth WHERE username = $1', [username]);
        if (!user.rows.length) {
            return res.status(400).json({ message: 'User not found' });
        }
        
        const validPassword = await bcrypt.compare(password, user.rows[0].password_hash);
        if (!validPassword) {
            return res.status(400).json({ message: 'Invalid password' });
        }

        const token = generateToken({ id: user.rows[0].id, username: user.rows[0].username });
        res.json({ token });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = { registerUser, loginUser };