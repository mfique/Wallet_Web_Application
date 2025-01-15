const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const accountRoutes = require('./routes/accountRoutes');
const transactionRoutes = require('./routes/transactionRoutes');

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

app.use('/accounts', accountRoutes);
app.use('/transactions', transactionRoutes);

app.listen(5000,
    () =>
        console.log('Backend running on http://localhost:5000'));
