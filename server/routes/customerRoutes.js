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
        const [feedback] = await db.query("SELECT id, rating, content, DATE_FORMAT(created_at, '%M %d, %Y %h:%i %p') as date FROM feedback WHERE user_id = ? ORDER BY id DESC", [req.userId]);
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

router.get('/getnotifs', verifyToken, async (req, res) => {
    try {
        const db = await connectToDatabase();
        const [notifs] = db.query('SELECT * FROM notifications WHERE customer_id = ?', [req.userId]);
        return res.status(201).json({ notifications : notifs });
    } catch (err) {
        return res.status(500).json({ message : err.message });
    }
})

router.post('/checkclaim', verifyToken, async (req, res) => {
    const {rewardId} = req.body;
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query("SELECT * FROM redemption WHERE reward_id = ? AND user_id = ? AND status = 'Claimed'", [rewardId, req.userId]);
        if (rows.length > 0) {
            return res.status(201).json({ 'claimed': true });
        } else {
            return res.status(201).json({ 'claimed': false });
        }
    } catch (err) {
        return res.status(500).json({ message : err.message });
    }
})

router.post('/checkredeem', verifyToken, async (req, res) => {
    const {rewardId} = req.body;
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT * FROM redemption WHERE reward_id = ? AND user_id = ?', [rewardId, req.userId]);

        if (rows.length > 0) {
            return res.status(201).json({ 'redeemed': true });
        } else {
            return res.status(201).json({ 'redeemed': false });
        }

    } catch (err) {
        return res.status(500).json({ message : err.message });
    }
})

router.post('/redeemreward', verifyToken, async (req, res) => {
  const { rewardname, rewardpoints, rewardid } = req.body;

  try {
    const db = await connectToDatabase();

    // Get fresh user row from DB using token userId
    const [urows] = await db.query(
      `SELECT u.id AS user_id, u.user_name, u.usertype_id, u.email, c.points AS points
       FROM users u
       JOIN customers c ON c.user_id = u.id
       WHERE u.id = ? AND u.isDeleted = 0 AND c.isDeleted = 0
       LIMIT 1`,
      [req.userId]
    );
    if (urows.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }
    const currUser = urows[0];

    const userID = currUser.user_id;
    const userPoints = Number(currUser.points);
    const pointsCost = Number(rewardpoints);

    if (userPoints < pointsCost) {
      return res.status(201).json({
        success: false,
        points: userPoints,
        message: `You do not have enough points to avail ${rewardname}.`
      });
    }

    const [existing] = await db.query(
      'SELECT id FROM redemption WHERE reward_id = ? AND user_id = ?',
      [rewardid, userID]
    );
    if (existing.length > 0) {
      return res.status(201).json({
        success: false,
        points: userPoints,
        message: `You already availed ${rewardname}`
      });
    }

    await db.query('UPDATE customers SET points = points - ? WHERE user_id = ?', [
      pointsCost, userID
    ]);

    const [rows] = await db.query(
      `SELECT c.points AS points FROM customers c WHERE c.user_id = ? LIMIT 1`,
      [userID]
    );
    const newPoints = rows.length ? Number(rows[0].points) : userPoints - pointsCost;

    const placeholder_code = 'PENDING';
    const [insertRes] = await db.query(
      'INSERT INTO redemption (user_id, reward_id, redemption_id) VALUES (?, ?, ?)',
      [userID, rewardid, placeholder_code]
    );
    const last_id = insertRes.insertId;
    const code = Math.floor(10000 + Math.random() * 90000);
    const redemption_id = `BRAD${code}_${last_id}`;

    await db.query('UPDATE redemption SET redemption_id = ? WHERE id = ?', [
      redemption_id, last_id
    ]);

    const success_message = `You have successfully availed ${rewardname}! Your voucher code is ${redemption_id}. Show this to the cashier to claim your prize.`;
    await db.query(
      'INSERT INTO notifications (message, customer_id, type, title) VALUES (?, ?, ?, ?)',
      [success_message, userID, 'redemption', 'Reward Redeemed!']
    );

    return res.status(201).json({
      success: true,
      points: newPoints,
      redemption_id,
      message: success_message
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
});

export default router;