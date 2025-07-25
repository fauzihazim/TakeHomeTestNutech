import express from 'express';
import { authenticateAccessToken } from '../middleware/authMiddleware.js';
import { getBalance } from '../controllers/transaction/transaction.js';

const app = express();
app.use(express.json()); 

app.get('/balance', authenticateAccessToken, getBalance);
export default app;