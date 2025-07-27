import express from 'express';
import { authenticateAccessToken } from '../middleware/authMiddleware.js';
import { getBalance, getHistories, payment, topUp } from '../controllers/transaction/transaction.js';
import { topUpValidator } from '../middleware/transactionMiddleware.js';

const app = express();
app.use(express.json()); 

app.get('/balance', authenticateAccessToken, getBalance);
app.post('/topup', authenticateAccessToken, topUpValidator, topUp);
app.post('/transaction', authenticateAccessToken, payment);
app.get('/transaction/history', authenticateAccessToken, getHistories);
export default app;