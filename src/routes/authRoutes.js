import express from 'express';
import { getProfile, login, register, updateProfile } from "../controllers/membership/auth.js";
import { authenticateAccessToken, loginValidator, registerValidator } from '../middleware/authMiddleware.js';

const app = express();
app.use(express.json()); 

app.post('/login', loginValidator, login);
app.post('/register', registerValidator, register);
app.get('/profile', authenticateAccessToken, getProfile);
app.put('/profile/update', authenticateAccessToken, updateProfile);
export default app;