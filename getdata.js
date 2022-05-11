const axios = require('axios')
const pokemones = []
const pokemonesDetalles = []

const pokemonesGet = async () => {
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/?limit=15`)
  return data.results
}
const getFullData = async(name) => {
  const { data } = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
  return data
}
pokemonesGet().then((results) => {
  results.forEach((p) => {
    const { name } = p
    pokemones.push(getFullData(name))
  })
  Promise.all(pokemones).then((data) => {
		data.forEach((p) => {
			const img = p.sprites.front_default
			const nombre = p.name
			pokemonesDetalles.push({ img, nombre })
		})
	})
})
module.exports = pokemonesDetalles
