const http = require('http')
const fs = require('fs')
const pokemonesDetalles = require ('./getdata.js')
http
  .createServer((req, res) => {
    if (req.url == '/') {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      fs.readFile('index.html', 'utf8', (err, html) => {
        res.end(html)
      })
    }
    if (req.url == '/pokemones') {
        res.writeHead(200, { 'Content-Type': 'application/json' })
        res.write(JSON.stringify(pokemonesDetalles))
        res.end()
      }
  })
  .listen(3000, () => console.log('Servidor encendido'))
