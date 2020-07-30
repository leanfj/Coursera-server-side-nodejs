const express = require('express')

const http = require('http')

const hostName = "localhost"

const port = 3000

const app = express()

app.use((req, res, next) => {
  console.log(req.headers);

  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end('<html><body><h1>This a Express server</h1></body></html>')

})

const server = http.createServer(app)

server.listen(port, hostName, () => {
  console.log(`Server running ar http://${hostName}:${port}`);

})
