# google cloud function http server

Call your http server stack code using an in memory http listener. No sockets needed.

[![js-standard-style](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://github.com/feross/standard)
[![build status](https://api.travis-ci.org/JamesKyburz/google-cloud-function-http-server.svg)](https://travis-ci.org/JamesKyburz/google-cloud-function-http-server)
[![downloads](https://img.shields.io/npm/dm/google-cloud-function-http-server.svg)](https://npmjs.org/package/google-cloud-function-http-server)
[![Greenkeeper badge](https://badges.greenkeeper.io/JamesKyburz/google-cloud-function-http-server.svg)](https://greenkeeper.io/)

## index.js

```javascript
require('http').createServer((req, res) => {
  if (req.url === '/hello') return res.end('world')
})
.listen(5000)
```

## proxy.js

```javascript
exports.http = require('google-cloud-function-http-server')
require('./index.js')
```

## serverless.yml

```yaml
service: test
provider:
  name: google
  runtime: nodejs8
  project: x
  credentials: ~/.gcloud/keyfile.json

plugins:
  - serverless-google-cloudfunctions

functions:
  proxy:
    environment:
      SERVER_PORT: "5000"
    handler: http
    events:
      - http: path
```

# license

[Apache License, Version 2.0](LICENSE)
