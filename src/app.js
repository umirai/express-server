const express = require('express')
const cookieParser = require('cookie-parser')
const ngrok = require('ngrok')

// ------------------------------

const app = express()
const port = 3000

app.use(express.json())

app.get('/', (req, res) => {
  res.status(200).json({ text: 'hello world' })
})

app.post('/', (req, res) => {
  if (!req.is('application/json')) {
    res.send(401)
  }
  res.status(201).json(req.body)
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

// ------------------------------

const mySite = express()
mySite.use(cookieParser())
mySite.use(express.static('src/my-site', {
  setHeaders: (res) => {
    res.cookie('1stP cookie', 1, { httpOnly: true })
  }
}))
mySite.listen(3001, () => { console.log('[3001] OK') })

// ------------------------------

const otherSite = express()
otherSite.use(express.static('src/other-site'))
otherSite.listen(3002, () => { console.log('[3002] OK') })

!(async function () {
  const url = await ngrok.connect(3002)
  console.log(`[${url}] OK`)
})()
