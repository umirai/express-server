const express = require('express')

const cacheServer = express()

// index.html
cacheServer.get('/', express.static('cache-site'))

// キャッシュなしの画像をホスティング
cacheServer.use(
  '/default',
  express.static('cache-site/', {
    setHeaders: (res) => {
      res.header("Cache-Control", "no-store, max-age=0")
    }
  })
)

// キャッシュありの画像をホスティング
cacheServer.use(
  '/cache',
  express.static('cache-site/', {
    setHeaders: (res) => {
      res.header("Cache-Control", "private, max-age=86400")
    }
  })
)

module.exports = cacheServer
