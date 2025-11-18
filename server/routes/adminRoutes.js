import { connectToDatabase } from '../lib/db.js';
import { verifyToken } from '../middleware/auth.js';
import express from 'express'

const router = express.Router();

router.get('/dashboard', verifyToken, async (req, res) => {
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

router.get('/vouchredem', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT rew.reward_name, COUNT(*) AS number_of_redemptions FROM redemption red JOIN rewards rew ON rew.id = red.reward_id GROUP BY red.reward_id');
        return res.status(201).json({ vouchredem : rows });
    } catch (err) {
        return res.status(500).json({ message : err.message});
    }
})

router.get('/allredem', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT u.user_name, r.reward_name, red.redemption_id, red.status, red.cashier_id FROM redemption red JOIN users u ON u.id = red.user_id JOIN rewards r ON r.id = red.reward_id');
        return res.status(201).json({ allredem : rows });
    } catch (err) {
        return res.status(500).json({ message : err.message });
    }
})

export default router;