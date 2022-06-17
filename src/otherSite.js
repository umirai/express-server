const express = require('express');

const otherSite = express();
otherSite.use(express.static('other-site', {
  setHeaders: (res) => {
    res
      .cookie('3rdP', 3, {
        httpOnly: true,
      })
      .cookie('3rdP-Strict', 3, {
        httpOnly: true,
        sameSite: 'strict',
      })
      .cookie('3rdP-Lax', 3, {
        httpOnly: true,
        sameSite: 'lax',
      })
      .cookie('3rdP-None', 3, {
        httpOnly: true,
        sameSite: 'none',
      })
      .cookie('3rdP-None-Secure', 3, {
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      });
  },
}));

module.exports = otherSite;
