const axios = require('axios')
const pokemonesPromesas = []
const pokemonesDetalles = []

async function pokemonesGet() {
  const { data } = await axios.get(
    'https://pokeapi.co/api/v2/pokemon?limit=150'
  )
  return data.results
}
async function getFullData(name) {
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
  return data
}
pokemonesGet().then((results) => {
  results.forEach((p) => {
    let pokemonName = p.name
    pokemonesPromesas.push(getFullData(pokemonName))
  })
  Promise.all(pokemonesPromesas).then((data) => {
    data.forEach((p) => {
      const img = p.sprites.front_default
      const nombre = p.nombre
      pokemonesDetalles.push({ img, nombre })
    })
  })
})
module.exports = pokemonesDetalles
