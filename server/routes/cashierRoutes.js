import { connectToDatabase } from '../lib/db.js';
import { verifyToken } from '../middleware/auth.js';
import express from 'express'

const router = express.Router();
let targetId = 20000005; // here nato i store ang id sa user nga mo order or retrieve sa ilang order

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

// kato ning para sa when you input your id number (sa customer) and then it will find if the customer exists or not
router.post('/cashierhome', async (req, res) => {
    const {userId} = req.body;
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT * FROM users WHERE id = ? LIMIT 1', [userId]);

        if (rows.length === 0) {
            return res.status(404).json({ message: "User not found."});
        }

        targetId = rows[0].id;         // gi store ang information sa kani nga id number
        return res.status(200).json({ message : "User located."});
    } catch (err) {
        return res.status(500).json(err.message);
    }
})

// fetching all products from the database
router.get('/cashierprod', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT p.*, category_name, points, p.isDeleted FROM products p JOIN category c ON c.id = p.category_id');
        return res.status(201).json({ products : rows });
    } catch (err) {
        return res.status(500).json(err.message);
    }
})

// continue this code lang nya which will redeem a voucher
router.post('/cashierredeem', async (req, res) => {
    const {redeemvouch} = req.body;
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT * FROM redemption WHERE redemption_id = ? AND user_id = ? LIMIT 1', [redeemvouch, targetId]);
        // if ()
    } catch (err) {
        return res.status(500).json(err.message);
    }
})

// when a customer redeems their reward
// insert code here lang nya

export default router;