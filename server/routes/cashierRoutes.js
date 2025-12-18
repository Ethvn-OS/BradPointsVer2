import { connectToDatabase } from '../lib/db.js';
import { verifyToken } from '../middleware/auth.js';
import express from 'express'

const router = express.Router();

router.get('/cashierhome', verifyToken, async (req, res) => {
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query("SELECT u.id AS user_id, u.user_name, u.password, u.usertype_id, u.email, c.points AS points FROM users u LEFT JOIN customers c ON c.user_id = u.id AND c.isDeleted = 0 WHERE user_id = ? AND u.isDeleted = 0 LIMIT 1", [req.userId]);

        if(rows.length === 0) {
            return res.status(404).json({ message : "User does not exist."});
        }

        return res.status(201).json({user: rows[0]});

    } catch (err) {
        return res.status(500).json({message: "server error"});
    }
})

router.post('/cashierhome', async (req, res) => {
    const {userId} = req.body;
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT * FROM users WHERE id = ? LIMIT 1', [userId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found."});
        }

        res.status(200).json({ message : "User located."});
    } catch (err) {
        res.status(500).json(err.message);
    }
})

export default router;