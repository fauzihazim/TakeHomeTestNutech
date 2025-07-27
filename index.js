import express from 'express';
import authRoutes from './src/routes/authRoutes.js';
import informationRoutes from './src/routes/informationRoute.js';
import transactionRoutes from './src/routes/transactionRoutes.js';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = process.env.PORT || 3000;

const app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.use(authRoutes);
app.use(informationRoutes);
app.use(transactionRoutes);

app.get('/', (req, res) => {
  res.send('Hello from Node.js on port 3000!');
})

app.listen(PORT || 3000, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});