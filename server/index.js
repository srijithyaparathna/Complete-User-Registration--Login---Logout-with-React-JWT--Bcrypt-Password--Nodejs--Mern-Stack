const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const connectDB = require('./config/db');
const authRouter = require('./routes/authRoutes');

const app = express();

// 1. MIDDLEWARES
app.use(cors());
app.use(express.json());

// 2. ROUTE
app.use('/api/auth', authRouter);

// 3. MONGO DB CONNECTION
connectDB();

// 4. GLOBAL ERROR HANDLER
app.use((err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    res.status(err.statusCode).json({
        status: err.status,
        message: err.message,
    });
});

// 5. SERVER
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
