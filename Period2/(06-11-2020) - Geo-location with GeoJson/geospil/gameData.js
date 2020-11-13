const gameArea = {
    "type": "Feature",
    "properties": {},
    "geometry": {
        "type": "Polygon",
        "coordinates": [
            [
                [
                    12.566041946411133,
                    55.79780736228199
                ],
                [
                    12.565784454345703,
                    55.790424914465916
                ],
                [
                    12.578058242797852,
                    55.787239897099205
                ],
                [
                    12.585010528564453,
                    55.79356141947292
                ],
                [
                    12.579431533813477,
                    55.79896526634484
                ],
                [
                    12.566041946411133,
                    55.79780736228199
                ]
            ]
        ]
    }
}

const players = [
    {
        "type": "Feature",
        "properties": {
            "name": "John-outside"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [
                12.563896179199219,
                55.79433344350657
            ]
        }
    },
    {
        "type": "Feature",
        "properties": {
            "name": "Tine-outside"
        },
        "geometry": {
            "type": "Point",
            "coordinates": [
                12.569389343261719,
                55.79964069448141
            ]
        }
    },
    {
        "type": "Feature",
        "properties": { "name": "Jan-inside" },
        "geometry": {
            "type": "Point",
            "coordinates": [
                12.572822570800781,
                55.79134176513057
            ]
        }
    },
    {
        "type": "Feature",
        "properties": { "name": "Line-inside" },
        "geometry": {
            "type": "Point",
            "coordinates": [
                12.577371597290039,
                55.79399568487488
            ]
        }
    }
]

module.exports = {
    gameArea, players
}