const express = require('express')
const app = express()
const port = process.env.PORT || 3333;
const path = require("path")
app.use(express.static(path.join(__dirname, 'public'))); //This allows us to only see things in public folder.

app.get('/', (req, res) => {
    res.send('Hello World!')
})

//date/2020/11
app.get("/date/:year/:month", (req, res) => {
    // res.send(req.params.year);
    // res.send(req.params.month);
    //
    // const yearMonth = req.params;
    // res.send(yearMonth);
    //
    const { year, month } = req.params;
    res.send({ year, month });
    //
    // res.send(req.params);
})

//query?year=2020&month=11
app.get("/query", (req, res) => {
    res.send(req.query)
})

//Postman post request - Needs middleware - Translates Json to JS with the express.json in middleware.
// {
//     "fName": "Tunoc",
//     "lName": "Mukiko"
// }
app.use(express.json())
app.post("/postdata", (req, res) => {
    const { fName, lName } = req.body;
    res.send({ fName, lName });
})

app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`)
})

