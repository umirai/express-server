const express = require('express')
const cookieParser = require('cookie-parser')
const ngrok = require('ngrok')

// ＊ ngrokアカウントを作成し、Your Authtokenを設定することで実際の動作を確認できます
const TOKEN = ''

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
mySite.set('view engine', 'ejs')
mySite.get('/', (req, res) => {
  res
    .cookie('1stP cookie', 1, { httpOnly: true })
    .render('index.ejs')
})
mySite.listen(3001, () => { console.log('[3001] OK') })

// ------------------------------

const otherSite = express()
otherSite.use(express.static('other-site'))
otherSite.listen(3002, () => { console.log('[3002] OK') })

!(async function () {
  await ngrok.authtoken(TOKEN)
  const url = await ngrok.connect(3002)
  console.log(`[${url}] OK`)

  // mySiteにurlを渡す
  mySite.locals.resourceURL = url
})()
