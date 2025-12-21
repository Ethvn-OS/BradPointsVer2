// for registration and login

import { connectToDatabase } from '../lib/db.js';
import express from 'express'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

const router = express.Router();

router.post('/signup', async (req, res) => {
    const {username, email, password} = req.body;
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT id FROM users WHERE (user_name = ? OR email = ?) AND isDeleted = 0 LIMIT 1', [username, email]);

        if(rows.length > 0) {
            return res.status(409).json({ message : "Username or email already taken. Please choose another."});
        }

        const hashPassword = await bcrypt.hash(password, 10);

        await db.query('INSERT INTO users (user_name, email, password) VALUES (?, ?, ?)', [username, email, hashPassword]);
        await db.query('INSERT INTO customers (user_id) SELECT id FROM users WHERE user_name = ?', [username]);

        return res.status(201).json({message : "User created sucessfully!"});
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

router.post('/login', async (req, res) => {
    const {email, password} = req.body;
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query("SELECT u.id AS user_id, u.user_name, u.password, u.usertype_id, u.email, c.points AS points FROM users u LEFT JOIN customers c ON c.user_id = u.id AND c.isDeleted = 0 WHERE u.email = ? AND u.isDeleted = 0 LIMIT 1", [email]);

        if(rows.length === 0) {
            return res.status(404).json({ message : "User does not exist."});
        }

        const isMatch = await bcrypt.compare(password, rows[0].password);

        if (!isMatch) {
            return res.status(401).json({ message: "Wrong password"});
        }

        const token = jwt.sign({id: rows[0].user_id}, process.env.JWT_KEY, {expiresIn: '3h'});

        return res.status(201).json({token: token,
                              message: "Successfully logged in!",
                              usertype: rows[0].usertype_id
        });
    } catch (err) {
        return res.status(500).json(err.message);
    }
});

export default router;