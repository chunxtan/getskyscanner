const fetch = require('node-fetch');
const cors = require('cors');
const express = require('express');

require('dotenv').config()

const app = express();

app.use(cors());
app.use(express.json());

const SKYSCANNER_KEY = process.env.EXPRESS_SKYSCANNER_API_KEY;
const HOTEL_KEY = process.env.EXPRESS_HOTELS4_API_KEY;

app.post('/api/getCodes', async (req,res) => {

  const url = 'https://partners.api.skyscanner.net/apiservices/v3/autosuggest/flights';

  const fetchOptions = {
    method: 'POST',
    headers: {
      'x-api-key': `${SKYSCANNER_KEY}`,
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
      'x-api-key': `${SKYSCANNER_KEY}`,
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

app.get('/api/getAccommsDestId', async (req, res) => {
  const baseUrl = 'https://hotels4.p.rapidapi.com/locations/v3/search';

  const queryParams = req.query;

  const url = new URL(baseUrl);
  url.search = new URLSearchParams(queryParams).toString();

  const fetchOptions = {
    method: 'GET',
    headers: {
      'X-RapidAPI-Key': `${HOTEL_KEY}`,
      'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
    }
  }

  try {
    const response = await fetch(url.href, fetchOptions);
    const returnRes = await response.json();
    res.json(returnRes);
  } catch(err) {
    console.error(err);
  }
})

app.post('/api/getAccomms', async (req, res) => {

  const url = 'https://hotels4.p.rapidapi.com/properties/v2/list';

  const fetchOptions = {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      'X-RapidAPI-Key': `${HOTEL_KEY}`,
      'X-RapidAPI-Host': 'hotels4.p.rapidapi.com'
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
