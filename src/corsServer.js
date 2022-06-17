const express = require('express');

const corsServer = express();
corsServer.use(express.json());
corsServer.use((_, res, next) => {
  res.header({
    'Access-Control-Allow-Origin': 'http://localhost:3001',
    'Access-Control-Allow-Methods': 'POST',
    'Access-Control-Allow-Headers': 'MY-TEST',
  });
  next();
});

corsServer.post('/', (_, res) => {
  const msg = 'POST Request Recieved';
  res.json({ response: msg });
  console.log(msg);
});

corsServer.options('/', (_, res) => {
  const msg = 'OPTION Request Recieved';
  res.send(msg);
  console.log(msg);
});

module.exports = corsServer;
