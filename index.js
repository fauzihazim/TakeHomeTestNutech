import express from 'express';
import authRoutes from './src/routes/authRoutes.js'
import informationRoutes from './src/routes/informationRoute.js';
import transactionRoutes from './src/routes/transactionRoutes.js'

const PORT = process.env.PORT || 3000;

const app = express();
app.use(authRoutes);
app.use(informationRoutes);
app.use(transactionRoutes);

app.get('/', (req, res) => {
    res.send('Hello from Node.js on port 3000!');
})

app.listen(PORT || 3000, () => {
  console.log(`Server berjalan di http://localhost:${PORT}`);
});