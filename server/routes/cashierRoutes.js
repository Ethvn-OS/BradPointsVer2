import { connectToDatabase } from '../lib/db.js';
import { verifyToken } from '../middleware/auth.js';
import express from 'express'

const router = express.Router();
let cashId; // id sa usa ka cashier
let targetId; // here nato i store ang id sa user nga mo order or retrieve sa ilang order

router.get('/cashierhome', verifyToken, async (req, res) => {
    console.log('=== /home route debug ===');
        console.log('req.userId:', req.userId);
        console.log('req.userId type:', typeof req.userId);

      try {
            const db = await connectToDatabase();

            console.log('Executing query with userId:', req.userId);

            const [rows] = await db.query(
                `SELECT 
                    u.id AS user_id, 
                    u.user_name, 
                    u.password, 
                    u.usertype_id, 
                    u.email, 
                    c.points AS points,
                    ca.cashier_id AS cashierId
                FROM users u
                LEFT JOIN customers c ON c.user_id = u.id AND c.isDeleted = 0
                LEFT JOIN cashiers ca ON ca.user_id = u.id AND ca.isDeleted = 0
                WHERE u.id = ? AND u.isDeleted = 0 
                LIMIT 1`,
                [req.userId]
            );

            console.log('Query result rows:', rows);
            console.log('Rows length:', rows.length);

            if(rows.length === 0) {
                return res.status(404).json({ message : "User does not exist."});
            }

            cashId = rows[0].user_id;
            return res.status(201).json({user: rows[0]});

        } catch (err) {
            console.error('Home route error:', err);
            return res.status(500).json({message: "server error"});
        }
})

// kato ning para sa when you input your id number (sa customer) and then it will find if the customer exists or not
router.post('/cashierhome', async (req, res) => {
    const {userId} = req.body;
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT * FROM users WHERE id = ? AND isDeleted = 0 LIMIT 1', [userId]);

        if (rows.length === 0) {
            return res.status(404).json({ found: false, message: "User not found."});
        }

        targetId = rows[0].id;         // gi store ang information sa kani nga id number
        return res.status(200).json({ found: true, message : "User located."});
    } catch (err) {
        return res.status(500).json(err.message);
    }
})

// fetching all products from the database
router.get('/cashierprod', async (req, res) => {
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT p.*, category_name, points, p.isDeleted FROM products p JOIN category c ON c.id = p.category_id WHERE p.isDeleted = 0');
        return res.status(201).json({ products : rows });
    } catch (err) {
        return res.status(500).json(err.message);
    }
})

// continue this code lang nya which will redeem a voucher
router.post('/cashierredeem', verifyToken, async (req, res) => {

    console.log('req.userId:', req.userId); // Add this line

    const {redeemvouch, customerId} = req.body; // let's say nga ang redeemvouch kay ang redemption id nga gi input sa user
    try {
        const db = await connectToDatabase();
        const [rows] = await db.query('SELECT * FROM redemption WHERE redemption_id = ? AND user_id = ? LIMIT 1', [redeemvouch, customerId]);
        if (rows.length > 0) {
            const [checkredeem] = await db.query("SELECT * FROM redemption WHERE redemption_id = ? AND user_id = ? AND status = 'Claimed'", [redeemvouch, customerId]);
            if (checkredeem.length > 0) {
                return res.status(409).json({ message : `Voucher ${redeemvouch} has already been claimed by User ID ${targetId}`});
            } else {
                await db.query("UPDATE redemption SET status = 'Claimed' WHERE redemption_id = ?", [redeemvouch]);
                const [cashierId] = await db.query('SELECT cashier_id FROM cashiers WHERE user_id = ?', [req.userId]);
                const legit_cashId = cashierId[0].cashier_id;
                console.log(legit_cashId);
                await db.query("UPDATE redemption SET cashier_id = ? WHERE redemption_id = ? AND user_id = ?", [legit_cashId, redeemvouch, customerId]);
                const success_message = `Voucher ${redeemvouch} has been claimed by User ID ${customerId}.`;
                const type = "claim";
                const title = "Reward Claimed!";
                await db.query("INSERT INTO notifications (message, customer_id, type, title) VALUES (?, ?, ?, ?)", [success_message, customerId, type, title]);
                return res.status(201).json({message : `Voucher ${redeemvouch} has been claimed by User ID ${customerId}.`});
            }
        } else {
            return res.status(404).json({ message : `Voucher ${redeemvouch} not found for User ID ${customerId}`});
        }
    } catch (err) {
        return res.status(500).json(err.message);
    }
})

router.post('/cashierorder', async (req, res) => {

    const { userId, totalPoints, orderItems } = req.body;

    try {
        const db = await connectToDatabase();

        // Check if customer exists
        const [customer] = await db.query(
            'SELECT c.*, u.user_name FROM customers c JOIN users u ON u.id = c.user_id WHERE c.user_id = ? AND c.isDeleted = 0 LIMIT 1', 
            [userId]
        );
        
        if (customer.length === 0) {
            return res.status(404).json({ success: false, message: 'Customer not found' });
        }

        // Update customer points (in customers table, not users)
        const newPoints = Number(customer[0].points) + Number(totalPoints);
        await db.query('UPDATE customers SET points = ? WHERE user_id = ?', [newPoints, userId]);

        return res.status(200).json({ 
            success: true, 
            message: `${totalPoints} points successfully added to user ${userId}`,
            newPoints: newPoints
        });
    } catch (err) {
        console.error('Order submission error:', err);
        return res.status(500).json({ success: false, message: err.message });
    }



    // const {orderData} = req.body;
    // try {
    //     const db = await connectToDatabase();

    //     let totalPoints = 0;
    //     for (const order of orderData) {
    //         totalPoints += order.qty * order.points;
    //     }

    //     if (totalPoints > 0 && targetId > 0) {
    //         await db.query("UPDATE customers SET points = points + ? WHERE user_id = ?", [totalPoints, targetId]);
    //         return res.status(201).json({ message: "Order processed successfully.", totalPoints: totalPoints });
    //     } else {
    //         return res.status(400).json({ message: "Invalid order data or user." });
    //     }

    // } catch (err) {
    //     return res.status(500).json({ message: err.message });
    // }
})

export default router;