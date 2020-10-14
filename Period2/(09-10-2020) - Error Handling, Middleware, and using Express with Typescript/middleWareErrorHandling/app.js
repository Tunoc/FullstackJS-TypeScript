//Læg i fil app.js

const express = require("express");
const path = require("path")
const app = express();

function API_Exception(code, message) {
    this.message = message;
    this.code = code;
    this.name = 'API_Exception';
}

app.use('', express.static(path.join(__dirname, 'public')))

const data = ["blue", "red", "yellow"]

app.get("/api/color/:id", (req, res) => {
    const id = Number(req.params.id);
    if (isNaN(id) || id < 0 || id > data.length) {
        throw new API_Exception(400, "Wrong or missing Arguments")
    }
    res.send(data[id]);
})

//404 does NOT take an error
app.use(function (req, res, next) {
    console.log("Got here, but passing the error on to the default handler")
    if (req.originalUrl.startsWith("/api")) {
        console.log("API ERROR")
        throw new API_Exception(404, "No endpoint located at: " + req.originalUrl)
        //throw new ReferenceError() // <- Show/Demo ugly html error.
    }
    next()
})

app.use(function (err, req, res, next) {
    if (err.name === "API_Exception") {
        return res.status(err.code).json({ code: err.code, message: err.message })
    }
    next(err)  //Pass on to the default error-handler. Displays the ugly html error.
})

const port = process.env.PORT || 4444;
app.listen(port, () => console.log(`Server started, listning on port: ${port}`))



