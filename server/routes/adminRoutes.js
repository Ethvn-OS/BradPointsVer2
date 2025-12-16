import { connectToDatabase } from '../lib/db.js';
import { verifyToken } from '../middleware/auth.js';
import bcrypt from 'bcrypt'
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

/*
-> Dashboard <-------------------------------------------------------------------
*/
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

/*
-> Users Page <-------------------------------------------------------------------
*/
router.get('/allcustomers', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT u.id, u.user_name, u.email, c.points, u.isDeleted FROM users u LEFT JOIN customers c ON c.user_id = u.id WHERE usertype_id = 2');
        return res.status(201).json({ allcustomers : rows });
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }
})

router.get('/allcashiers', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT id, user_name, email, isDeleted FROM users WHERE usertype_id = 1');
        return res.status(201).json({ allcashiers : rows });
    } catch (err) {
        return res.status(500).json({ message : err.message });
    }
})

router.post('/adduser', async (req, res) => {
    const {userInfo} = req.body;
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT id FROM users WHERE (user_name = ? OR email = ?) and isDeleted = 0 LIMIT 1', [userInfo.username, userInfo.email]);

        if (rows.length > 0) {
            return res.status(409).json({ message : "Username or email already taken. Please choose another."});
        }

        const hashPassword = await bcrypt.hash(userInfo.password, 10);

        const [result] = await db.query('INSERT INTO users (user_name, email, password, usertype_id) VALUES (?, ?, ?, ?)', [userInfo.username, userInfo.email, hashPassword, userInfo.usertype]);
        const newUserId = result.insertId;

        if (userInfo.usertype == 2) { // pag add to customers
            await db.query('INSERT INTO customers (user_id) VALUES (?)', [newUserId]);
            return res.status(201).json({ message : "Customer user successfully added!", userId: newUserId });
        } else { // this else statement kay pag add to cashier
            await db.query('INSERT INTO cashiers (user_id) VALUES (?)', [newUserId]);
            return res.status(201).json({ message : "Cashier user successfully added!", userId: newUserId });
        }

    } catch (err) {
        res.status(500).json(err.message);
    }
})

router.post('/updateuser', async (req, res) => {
    const {editId, editUsername, editPoints, editEmail, usertype} = req.body;
    try {
        const db = await connectToDatabase();
        await db.query('UPDATE users SET user_name = ?, email = ? WHERE id = ?', [editUsername, editEmail, editId]);

        if (usertype == 2) {
            await db.query('UPDATE customers SET points = ? WHERE user_id = ?', [editPoints, editId]);
            return res.status(200).json({ message : "User updated!", editedUsername : editUsername, editedPoints : editPoints, editedEmail : editEmail });
        }

        return res.status(200).json({ message : "User updated!", editedUsername : editUsername, editedEmail : editEmail });
    } catch (err) {
        res.status(500).json(err.message);
    }
})

router.post('/deleteuser', async (req, res) => {
    const {userId, usertype} = req.body;
    try {
        const db = await connectToDatabase();
        await db.query('UPDATE users SET isDeleted = 1 WHERE id = ?', [userId]);

        if (usertype == 2) {
            await db.query('UPDATE customers SET isDeleted = 1 WHERE user_id = ?', [userId]);
        } else {
            await db.query('UPDATE cashiers SET isDeleted = 1 WHERE user_id = ?', [userId]);
        }

        return res.status(200).json({ message : "User deleted!" });

    } catch (err) {
        res.status(500).json(err.message);
    }
})

/*
-> Products Page <-------------------------------------------------------------------
*/
// insert product CRUD

/*
-> Rewards Page <-------------------------------------------------------------------
*/
// insert reward CRUD

/*
-> Feedback Page <-------------------------------------------------------------------
*/
// insert feedback CRUD

export default router;