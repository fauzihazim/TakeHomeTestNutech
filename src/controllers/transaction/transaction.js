// import 'dotenv/config';
import { conn } from '../../utils/db.js';

export const getBalance = async (req, res) => {
    try {
        const email = res.locals.email;
        const [[userBalance]] = await conn.execute(
            'SELECT balance FROM users WHERE email = ?',
            [email]
        );
        console.log(userBalance.balance);
        
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