import { conn } from '../../utils/db.js';
import { format } from 'date-fns';

export const getBalance = async (req, res) => {
    try {
        const email = res.locals.email;
        const [[userBalance]] = await conn.execute(
            'SELECT balance FROM users WHERE email = ?',
            [email]
        );
        if (!userBalance) {
            res.status(404).json({
                status: "failed",
                message: "User tidak ditemukan"
            });
            return;
        };
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
    let connection;
    const email = res.locals.email;
    const userId = res.locals.userId;
    try {
        
        connection = await conn.getConnection();
        await connection.beginTransaction();
        await connection.execute(
            'UPDATE users SET balance = balance + ? WHERE email = ? AND idUser = ?',
            [top_up_amount, email, userId]
        );
        const [transactionResult] = await connection.execute(
            'INSERT INTO transactions (idUser, amount, transaction_type) VALUES (?, ?, ?)',
            [userId, top_up_amount, 'TOPUP']
        );
        console.log(transactionResult.insertId);
        
        const invoiceNumber = generateInvoice(transactionResult.insertId);
        console.log("here 1");
        await connection.execute(
            'INSERT INTO topup (idTransaction, amount, topupStatus, invoice_number) VALUES (?, ?, ?, ?)',
            [transactionResult.insertId, top_up_amount, 'SUCCESS', invoiceNumber]
        );
        console.log("here 1");
        const [[userBalance]] = await connection.execute(
            'SELECT balance FROM users WHERE email = ?',
            [email]
        );
        await connection.commit();
        res.status(200).json({
            status: 0,
            message: "Get Balance Berhasil",
            data: {
                balance: userBalance.balance
            }
        });
    } catch (error) {
        console.error(error);
        
        try {
            if (connection) {
                await connection.rollback();
                const [transactionResult] = await conn.execute(
                    'INSERT INTO transactions (idUser, amount, transaction_type) VALUES (?, ?, ?)',
                    [userId, top_up_amount, 'TOPUP']
                );
                if (transactionResult?.insertId) {
                    await conn.execute(
                        'INSERT INTO topup (idTransaction, amount, topupStatus) VALUES (?, ?, ?)',
                        [transactionResult.insertId, top_up_amount, 'FAILED']
                    );
                }
            }
        } catch (rollbackError) {
            console.error('Rollback error:', rollbackError);
        }
        res.status(500).json({
            status: "failed",
            error: "Internal server error"
        });
    } finally {
        if (connection) connection.release();
    }
}

export const payment = async (req, res) => {
    const {top_up_amount} = req.body;
    let connection;
    const email = res.locals.email;
    const userId = res.locals.userId;
    try {
        
        connection = await conn.getConnection();
        await connection.beginTransaction();
        await connection.execute(
            'UPDATE users SET balance = balance + ? WHERE email = ? AND idUser = ?',
            [top_up_amount, email, userId]
        );
        const [transactionResult] = await connection.execute(
            'INSERT INTO transactions (idUser, amount, transaction_type) VALUES (?, ?, ?)',
            [userId, top_up_amount, 'TOPUP']
        );
        console.log(transactionResult.insertId);
        
        const invoiceNumber = generateInvoice(transactionResult.insertId);
        console.log("here 1");
        await connection.execute(
            'INSERT INTO topup (idTransaction, amount, topupStatus, invoice_number) VALUES (?, ?, ?, ?)',
            [transactionResult.insertId, top_up_amount, 'SUCCESS', invoiceNumber]
        );
        console.log("here 1");
        const [[userBalance]] = await connection.execute(
            'SELECT balance FROM users WHERE email = ?',
            [email]
        );
        await connection.commit();
        res.status(200).json({
            status: 0,
            message: "Get Balance Berhasil",
            data: {
                balance: userBalance.balance
            }
        });
    } catch (error) {
        console.error(error);
        
        try {
            if (connection) {
                await connection.rollback();
                const [transactionResult] = await conn.execute(
                    'INSERT INTO transactions (idUser, amount, transaction_type) VALUES (?, ?, ?)',
                    [userId, top_up_amount, 'TOPUP']
                );
                if (transactionResult?.insertId) {
                    await conn.execute(
                        'INSERT INTO topup (idTransaction, amount, topupStatus) VALUES (?, ?, ?)',
                        [transactionResult.insertId, top_up_amount, 'FAILED']
                    );
                }
            }
        } catch (rollbackError) {
            console.error('Rollback error:', rollbackError);
        }
        res.status(500).json({
            status: "failed",
            error: "Internal server error"
        });
    } finally {
        if (connection) connection.release();
    }
}

const generateInvoice = (id) => {
    const today = format(new Date(), 'ddMMyyyy');
    return `INV${today}-00${id}`;
}