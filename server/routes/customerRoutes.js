import { connectToDatabase } from '../lib/db.js';
import { verifyToken } from '../middleware/auth.js';
import express from 'express'

const router = express.Router();
let user; // here lang nato i store ang rows that you get when you login

router.get('/home', verifyToken, async (req, res) => {
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query("SELECT u.id AS user_id, u.user_name, u.password, u.usertype_id, u.email, c.points AS points FROM users u LEFT JOIN customers c ON c.user_id = u.id AND c.isDeleted = 0 WHERE user_id = ? AND u.isDeleted = 0 LIMIT 1", [req.userId]);

        if(rows.length === 0) {
            return res.status(404).json({ message : "User does not exist."});
        }
        user = rows[0];
        return res.status(201).json({user: rows[0]});

    } catch (err) {
        return res.status(500).json({message: "server error"});
    }
})

router.get('/feedback', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const [feedback] = await db.query("SELECT id, rating, content, DATE_FORMAT(created_at, '%M %d, %Y %h:%i %p') as date FROM feedback WHERE user_id = ? ORDER BY id DESC", [user.userId]);
        return res.status(201).json({ feedback : feedback });
    } catch (err) {
        return res.status(500).json({ message : err.message });
    }
})

router.get('/rewards', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const [rewards] = await db.query('SELECT * FROM rewards WHERE isDeleted = 0');
        return res.status(201).json({ rewards : rewards });
    } catch (err) {
        return res.status(500).json({ message : err.message });
    }
})

export default router;