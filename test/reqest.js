const handler = require('../')
const http = require('http')
const { test } = require('tap')
const listen = fn => http.createServer(fn).listen(process.env.SERVER_PORT)

process.env.SERVER_PORT = 5000

test('hello world', async t => {
  t.plan(1)
  const hello = (req, res) => res.end('world')
  listen(hello)
  handler(
    {
      rawBody: '',
      push () {}
    },
    {
      end (text) {
        t.equals('world', text)
      }
    }
  )
})

test('rawBody is pushed back to stream', async t => {
  t.plan(3)
  const expected = ['hello', null]
  const hello = (req, res) => res.end('world')
  listen(hello)
  handler(
    {
      rawBody: 'hello',
      push (data) {
        t.equals(expected.shift(), data)
      }
    },
    {
      end (text) {
        t.equals('world', text)
      }
    }
  )
})
