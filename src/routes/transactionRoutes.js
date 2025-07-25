import express from 'express';
import { authenticateAccessToken } from '../middleware/authMiddleware.js';
import { getBalance, topUp } from '../controllers/transaction/transaction.js';
import { topUpValidator } from '../middleware/transactionMiddleware.js';

const app = express();
app.use(express.json()); 

app.get('/balance', authenticateAccessToken, getBalance);
app.post('/topup', authenticateAccessToken, topUpValidator, topUp);
export default app;