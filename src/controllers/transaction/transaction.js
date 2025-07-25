import { conn } from '../../utils/db.js';

export const getBalance = async (req, res) => {
    try {
        const email = res.locals.email;
        const [[userBalance]] = await conn.execute(
            'SELECT balance FROM users WHERE email = ?',
            [email]
        );
        res.status(200).json({
            status: 0,
            message: "Get Balance Berhasil",
            data: {
                balance: userBalance.balance
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            error: "Internal server error"
        });
    }
}

export const topUp = async (req, res) => {
    const {top_up_amount} = req.body;
    try {
        const email = res.locals.email;
        const [addBalance] = await conn.execute(
            'UPDATE users SET balance = balance + ? WHERE email = ?',
            [top_up_amount, email]
        );
        if (!addBalance.affectedRows) {
            throw new Error("Failed top up");
        }
        const [[balance]] = await conn.execute(
            'SELECT balance FROM users WHERE email = ?',
            [email]
        );        
        
        res.status(200).json({
            status: 0,
            message: "Top Up Balance berhasil",
            data: {
                balance
            }
        });
    } catch (error) {
        res.status(500).json({
            status: "failed",
            error: "Internal server error"
        });
    }
}