'use strict'

const httpHandler = require('in-memory-http-listener')
const { Stream } = require('stream')

module.exports = (req, res) => {
  req._readableState = new Stream.Readable()._readableState
  req.push(req.rawBody)
  req.push(null)
  httpHandler(process.env.SERVER_PORT)(req, res)
}
