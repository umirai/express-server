const express = require('express');
const cookieParser = require('cookie-parser');

const mySite = express();
mySite.use(cookieParser());
mySite.set('view engine', 'ejs');
mySite.get('/', (_, res) => {
  res
    .cookie('1stP cookie', 1, { httpOnly: true })
    .render('index.ejs');
});

module.exports = mySite;
