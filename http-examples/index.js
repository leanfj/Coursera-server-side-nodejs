const http = require('http')
const fs = require('fs')
const path = require('path')

const hostname = 'localhost'

const port = 3000

const server = http.createServer((req, res) => {
  console.log(`Request for ${req.url} by method ${req.method}`)

  if (req.method == 'GET') {
    let fileURL
    if (req.url == '/') {
      fileURL = '/index.html';
    } else {
      fileURL = req.url;
    }

    let filePATH = path.resolve(`./public${fileURL}`);

    const fileEXT = path.extname(filePATH);

    if (fileEXT == '.html') {
      fs.exists(filePATH, (exists) => {
        if (!exists) {
          res.statusCode = 404
          res.setHeader('Content-Type', 'text/html')
          res.end(`
            <html>
              <body>
                <h1> Error 404: ${fileURL} not found</h1>
              </body>
            </html>
          `)
          return
        }

        res.statusCode = 200
        res.setHeader('Content-Type', 'text/html')
        fs.createReadStream(filePATH).pipe(res)
      })
    } else {
      res.statusCode = 404
      res.setHeader('Content-Type', 'text/html');
      res.end(`
              <html>
                <body>
                  <h1> Error 404: ${fileURL} not a HTML file</h1>
                </body>
              </html>
            `)
    }
  } else {
    res.statusCode = 404
    res.setHeader('Content-Type', 'text/html');
    res.end(`
              <html>
                <body>
                  <h1> Error 404: ${req.method} not supported</h1>
                </body>
              </html>
            `)

  }
})

server.listen(port, hostname, () => {
  console.log(`Server running at http://${hostname}:${port}`)
})



















