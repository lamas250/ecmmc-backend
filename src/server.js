import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import dotenv from 'dotenv';
import orderRouter from './routers/orderRouter.js';

dotenv.config();

const app = express();
app.use(express.json());
// app.use(express.urlencoded({extended: true}))
app.use(cors())

mongoose.connect(
  '...',
  {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}
  )

app.get('/', (req, res) => {
    res.send('OK');
})
app.get('/api/config/paypal', (req, res) => {
  res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
})

app.use('/api/users', userRouter);
app.use('/api/products', productRouter);
app.use('/api/orders', orderRouter);

// Tratando erro.
app.use((err, req, res, next) => {
  res.status(500).send({message: err.message});
})


const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Rodando na ${port}`)
})
