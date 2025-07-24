import express from 'express';
import { login, register } from "../controllers/membership/auth.js";
import { registerValidator } from '../middleware/authMiddleware.js';

const app = express();
app.use(express.json()); 

app.get('/login', login);
app.post('/register', registerValidator, register);

export default app;