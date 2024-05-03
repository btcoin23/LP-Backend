require('dotenv').config();

const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();

// const signin = require('./routes/signin');
// const signup = require('./routes/signup');
// const addpoint2user = require('./routes/addpoint2user');
// const addspent2user = require('./routes/addspent2user');
// const getuser = require('./routes/getuser');
// const getallusers = require('./routes/getallusers');
const getInf = require('./routes/getInf');


// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Define Routes
// app.use('/api/signin', signin);
// app.use('/api/signup', signup);
// app.use('/api/addpoint2user', addpoint2user);
// app.use('/api/addspent2user', addspent2user);
// app.use('/api/getuser', getuser);
// app.use('/api/getallusers', getallusers);
app.use('/raydium-api/getInf', getInf);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));