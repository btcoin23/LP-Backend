const express = require('express');
const cors = require('cors');
const app = express();
// Middleware
app.use(express.json());
app.use(cors());

let fetchedData = null;

<<<<<<< HEAD
const fetchTime = 1000 * 60 * 60 * 5;
=======
const fetchTime = 1000 * 60 * 60 * 3;
>>>>>>> 74f2faa5336aeab2a3c75a850ec135feae61b06d
const poolUrl = 'https://api.raydium.io/v2/sdk/liquidity/mainnet.json'

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

setInterval(fetchData, fetchTime);

// Route to serve data based on ID
app.get('/raydium-api/getpoolid', async (req, res) => {
  try {
    const id = req.query.id;

    console.log(`GET request with ${id}`);
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