const ngrok = require('ngrok')
const appServer = require('./appServer')
const mySite = require('./mySite')
const otherSite = require('./otherSite')
const corsServer = require('./corsServer')

appServer.listen(3000, () => { console.log('[3000] OK') })
mySite.listen(3001, () => { console.log('[3001] OK') })
otherSite.listen(3002, () => { console.log('[3002] OK') })
corsServer.listen(3003, () => { console.log('[3003] OK') })

// --------------------------------------------------

!(async function () {
  // [TODO]: ngrokアカウントを作成し、Your Authtokenを設定する
  const TOKEN = ''

  await ngrok.authtoken(TOKEN)
  const url = await ngrok.connect(3002)
  console.log(`[${url}] OK`)

  // mySiteにurlを渡す
  mySite.locals.resourceURL = url
})()
