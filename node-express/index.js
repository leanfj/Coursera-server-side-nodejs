const express = require('express')
const morgan = require('morgan')
const http = require('http')
const bodyParser = require('body-parser')

const dishRoute = require('./routes/dishRouter')
const promoRoute = require('./routes/promoRouter')
const leaderRoute = require('./routes/leaderRouter')

const hostName = "localhost"

const port = 3000

const app = express()

app.use(morgan('dev'))
app.use(bodyParser.json())
app.use('/dishes', dishRoute)
app.use('/promotions', promoRoute)
app.use('/leaders', leaderRoute)

app.use(express.static(`${__dirname}/public`))

app.use((req, res, next) => {
  res.statusCode = 200
  res.setHeader('Content-Type', 'text/html')
  res.end('<html><body><h1>This a Express server</h1></body></html>')

})

const server = http.createServer(app)

server.listen(port, hostName, () => {
  console.log(`Server running ar http://${hostName}:${port}`);

})
