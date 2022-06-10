const express = require('express')

const appServer = express()

appServer.use(express.json())

appServer.get('/', (_, res) => {
  res.status(200).json({ text: 'hello world' })
})

appServer.post('/', (req, res) => {
  if (!req.is('application/json')) {
    res.send(401)
  }
  res.status(201).json(req.body)
})

module.exports = appServer
