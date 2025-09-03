require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const connectDB = require('./db');
const taskRoutes = require('./src/routes/taskRoutes');
const errorHandler = require('./src/middleware/errorHandler');


const app = express();


app.use(cors());
app.use(express.json());

connectDB();

app.get('/api/health', (req, res)=>{
    res.json({ status: 'ok', time: new Date().toISOString() });
});

app.use('/api/tasks', taskRoutes);

app.use(errorHandler);



app.listen(process.env.PORT || 5000);