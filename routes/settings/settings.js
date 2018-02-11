const express = require('express')
const router = express.Router()
const { getBaseUri } = require('../../utils')

router.get('/socket-uri', (req, res) => {
  res.status(200).send({
    uri: getBaseUri()
  })
})

module.exports = router