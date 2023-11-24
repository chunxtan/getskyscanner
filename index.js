const fetch = require('node-fetch');
const cors = require('cors');
const express = require('express');

require('dotenv').config()

const app = express();

app.use(cors());
app.use(express.json());

const KEY = process.env.EXPRESS_SKYSCANNER_API_KEY;

app.post('/api/getCodes', async (req,res) => {

  const url = 'https://partners.api.skyscanner.net/apiservices/v3/autosuggest/flights';

  const fetchOptions = {
    method: 'POST',
    headers: {
      'x-api-key': `${KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body)
  }

  try {
    const response = await fetch(url, fetchOptions);
    const returnRes = await response.json();
    res.json(returnRes);
  } catch(err) {
    console.error(err);
  }
})

app.post('/api/getFlights', async (req, res) => {

  const url = 'https://partners.api.skyscanner.net/apiservices/v3/flights/live/search/create';

  const fetchOptions = {
    method: 'POST',
    headers: {
      'x-api-key': `${KEY}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(req.body)
  }

  try {
    const response = await fetch(url, fetchOptions);
    const returnRes = await response.json();
    res.json(returnRes);
  } catch(err) {
    console.error(err);
  }
})

const port = process.env.PORT || 8080

app.listen(port, (err, res) => {
    if (err) {
        console.log(err)
        return res.status(500).send(err.message)
    } else {
        console.log('[INFO] Server Running on port:', port)
    }
})
