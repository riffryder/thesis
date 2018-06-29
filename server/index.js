require('dotenv').config();

const db = require('../database/models/index');

//
// ─── MODULE IMPORTS ─────────────────────────────────────────────────────
//
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const morgan = require('morgan');
const session = require('express-session');

//
// ─── ROUTE IMPORTS ─────────────────────────────────────────────────────
//
const profile = require('./routes/profile');
const weather = require('./routes/weather');
const news = require('./routes/news');
const stocks = require('./routes/stocks');
const particle = require('./routes/particle');

//
// ─── MIDDLEWARE ─────────────────────────────────────────────────────
//
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/../react-client/dist`));
app.use(morgan('dev'));
app.use(session({
  secret: 'particle cat',
  resave: false,
  saveUninitialized: true,
  particleToken: '',
}));

//
// ─── ROUTE MIDDLEWARE ─────────────────────────────────────────────────────
//
app.use(weather);
app.use(news);
app.use(stocks);
app.use(profile);
app.use(particle);

//
// ─── SERVER START ───────────────────────────────────────────────────────────────
//

db.models.sequelize.sync().then(() => {
  app.listen(process.env.PORT || 3000, () => {
    console.log('listening on port 3000!');
  });
});

