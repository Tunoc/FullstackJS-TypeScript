import fetch from 'node-fetch';
import "core-js/proposals/promise-any";

const p1 = fetch("https://api.chucknorris.io/jokes/random");
const p2 = fetch("https://api.chucknorris.io/jokes/random");
const p3 = fetch("https://api.chucknorris.io/jokes/random");

async function allFunction() {
    await Promise.all([p1, p2, p3])
        .then(responses => responses
            .forEach(response => response.json()
                .then(data => console.log(`Joke: ${data.value}`))));
}
//allFunction();

async function anyFunction() {
    let anyData = await Promise.any([p1, p2, p3])
        .then(r => r.json())
    console.log(`Joke: ${anyData.value}`)
}
//anyFunction();