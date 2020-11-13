const express = require('express');
const { geometryWithinRadius } = require('geojson-utils');
const app = express()
const gju = require('geojson-utils')
app.get('/', (req, res) => res.send('Geo Demo!'))

const players = require("./gameData.js").players;
const gameArea = require("./gameData.js").gameArea.geometry;

app.listen(3000, () => console.log('Example app listening on port 3000!'))

app.get('/geoapi/isuserinarea/:lon/:lat', (req, res) => {
    const { lon, lat } = req.params
    const point = { "type": "Point", "coordinates": [lon, lat] }

    const status = gju.pointInPolygon(point, gameArea)
    const msg = status ? "Point was inside the tested polygon" : "Point was NOT inside tested polygon"

    const customRes = {
        status,
        msg
    }

    res.send(customRes)
})

app.get('/geoapi/findNearbyPlayers/:lon/:lat/:rad', (req, res) => {
    const { lon, lat, rad } = req.params
    const point = { "type": "Point", "coordinates": [lon, lat] }

    const result = players.filter(player => gju.geometryWithinRadius(player.geometry, point, rad));

    res.send(result)
})

app.get('/geoapi/distanceToUser/:lon/:lat/:username', (req, res) => {
    const { lon, lat, username } = req.params

    const playerCordinates = players.find(player => {
        return player.properties.name && player.properties.name == username
    });

    if (playerCordinates) {
        const distance = gju.pointDistance({ type: 'Point', coordinates: [lon, lat] }, playerCordinates.geometry)
        const to = playerCordinates.properties.name
        res.send({
            distance,
            to
        })
    }
    res.statusCode = 404
    res.send({
        "msg": "User not found"
    })
})