import express from 'express';
import data from './data.js';
import cors from 'cors';

const app = express();
app.use(cors())

app.get('/', (req, res) => {
    res.send('OK');
})

app.get('/api/products', (req, res) => {
    res.send(data.products);
})


const port = process.env.PORT || 8000;

app.listen(port, () => {
    console.log(`Rodando na ${port}`)
})