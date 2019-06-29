require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const {API_BASE_URL} = require('./config')
// const cors = require('cors')
// const {CLIENT_ORIGIN} = require('./config')
const helmet = require('helmet')
const { NODE_ENV } = require('./config')
const app = express()
const DRINKS = require('./drinks.json')

const morganOption = (NODE_ENV === 'production')
  ? 'tiny'
  : 'common';

//   app.use(
//     cors({
//         origin: CLIENT_ORIGIN
//     })
// );

app.get('/', (req, res) => {
    res.send('Welcome to the Whatll It Be app server!')
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
    if (process.env.NODE_ENV === 'production') {
    response = { error: { message: 'server error' } }
    } else {
     console.error(error)
    response = { message: error.message, error }
    }
    res.status(500).json(response)
    })

app.use(morgan(morganOption))

app.use(helmet())

module.exports = app