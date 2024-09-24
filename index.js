const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

const mentorRoutes = require('./routes/mentorRoutes');
const studentRoutes = require('./routes/studentRoutes');

const app = express();
app.use(bodyParser.json());

app.use('/api/mentors', mentorRoutes);
app.use('/api/students', studentRoutes);


app.get('/', (req, res) => {
    res.send('A server is working good !');
  });

  
// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log('MongoDB connected');
    app.listen(process.env.PORT, () => {
        console.log(`Server running on port:  http://localhost:${process.env.PORT}`);
    });
}).catch(err => console.error('Connection error', err));
