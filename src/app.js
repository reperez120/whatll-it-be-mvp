require('dotenv').config();
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');
const {CLIENT_ORIGIN} = require('./config');
const helmet = require('helmet');
const { NODE_ENV } = require('./config');
const app = express();
const {API_BASE_URL} = require('./config');
const DRINKS = require('./drinks.json')

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

app.use(morgan(morganOption))
 app.use(cors())
 app.use(helmet())


app.get('/', (req, res) => {
  res.send('Welcome to the Whatll It Be API!')
})

app.get('/drinks', function handleGetDrinks(req,res) {
  let response = DRINKS.drinks;

if (req.query.name) {
    response = response.filter(drink =>
      drink.name.toLowerCase().includes(req.query.name.toLowerCase())
    )
  }
  if (req.query.type) {
    response = response.filter(drink =>
      drink.type.includes(req.query.type)
    )
  }
  res.json(response)
})

app.use(function errorHandler(error, req, res, next) {
  let response
  if (NODE_ENV === 'production') {
  response = { error: { message: 'server error' } }
  } else {
    console.error(error)
  response = { message: error.message, error }
  }
  res.status(500).json(response)
})

module.exports = app