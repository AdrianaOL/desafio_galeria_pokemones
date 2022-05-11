const http = require('http')
const fs = require('fs')
const axios = require('axios')

const pokemonesGet = async () => {
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=150`)
  return data.results
}
const getFullData = async(url) => {
  const { data } = await axios.get(url)
  return data
}
http
  .createServer((req, res) => {
    if (req.url === '/') {
      res.writeHead(200, { 'Content-Type': 'text/html' })
      fs.readFile('index.html', 'utf8', (err, html) => {
        res.end(html)
      })
    }
    if (req.url == '/pokemones') {
      const pokemones = []
      const pokemonesDetalles = []
      res.writeHead(200, { 'Content-Type': 'application/json' })
      //
      pokemonesGet().then((results) => {
        results.forEach((p) => {
          pokemones.push(getFullData(p.url))
        })
        Promise.all(pokemones).then((data) => {
          data.forEach((p) => {
            const img = p.sprites.front_default
            const nombre = p.name
            pokemonesDetalles.push({ img, nombre })
          })
          //
          res.write(JSON.stringify(pokemonesDetalles))
          res.end()
        })
      })
    }
  })
  .listen(3000, () => console.log('Servidor encendido'))
