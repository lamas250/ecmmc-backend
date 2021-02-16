import express from 'express';
import data from './data.js';
import cors from 'cors';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.js';

const app = express();
app.use(cors())

mongoose.connect(
  'mongodb+srv://igorlamas:igorlamas@cluster0.ijbf1.mongodb.net/ecommerce?retryWrites=true&w=majority',
  {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}
  )

app.get('/', (req, res) => {
    res.send('OK');
})

app.get('/api/products', (req, res) => {
    res.send(data.products);
})

app.use('/api/users', userRouter)
app.get('/api/products/:id', (req, res) => {
  const product = data.products.find( x => x._id === req.params.id);
  if(product){
    res.send(product);
  }else{
    res.status(404).send({message: 'Product not Found'})
  }
})

app.use((err, req, res, next) => {
  res.status(500).send({message: err.message});
})


const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Rodando na ${port}`)
})