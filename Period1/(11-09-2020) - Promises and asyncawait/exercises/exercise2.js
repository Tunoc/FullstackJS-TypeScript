// a) with plain promises
//  Now, Implement a method getPlanetforFirstSpeciesInFirstMovieForPerson(id){} which for id = 1 (Luke Skywalker) should log this info:
// Name: Luke Skywalker
// First film: The Empire Strikes Back
// First species: Yoda's species
// Homeworld for Specie: unknown
const fetch = require('node-fetch');

function getPlanetforFirstSpeciesInFirstMovieForPerson(id) {
    fetch("https://swapi.dev/api/people/" + id).then(response => response.json())
        .then(data => {
            console.log(`Name: ${data.name}`)
            return fetch(data.films[0]).then(response => response.json())
        })
        .then(data => {
            console.log(`First film ${data.title}`)
            return fetch(data.species[0]).then(response => response.json())
        })
        .then(data => {
            console.log(`First species: ${data.name}`)
            return fetch(data.homeworld).then(response => response.json())
        })
        .then(data => console.log(`Homeworld for Specie: ${data.name}`))
}
// getPlanetforFirstSpeciesInFirstMovieForPerson(1);



async function getPlanetforFirstSpeciesInFirstMovieForPersonAsync(id) {
    let character = await fetch("https://swapi.dev/api/people/" + id).then(r => r.json())
    let film = await fetch(character.films[0]).then(r => r.json())
    let species = await fetch(film.species[0]).then(r => r.json())
    let homeworld = await fetch(species.homeworld).then(r => r.json())
    let starWars = {
        fullName: character.name,
        firstFilm: film.title,
        firstSpecies: species.name,
        homeworldForSpecie: homeworld.name
    }
    console.log(starWars)
}
//getPlanetforFirstSpeciesInFirstMovieForPersonAsync(1)