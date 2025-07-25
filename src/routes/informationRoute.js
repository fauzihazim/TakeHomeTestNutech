import express from 'express';
import { getBanners, getServices } from '../controllers/information/information.js';
import { authenticateAccessToken } from '../middleware/authMiddleware.js';

const app = express();
app.use(express.json()); 

app.get('/banner', getBanners);
app.get('/services', authenticateAccessToken, getServices);
export default app;