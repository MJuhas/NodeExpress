const express = require("express")
const fs = require('fs'); // read from files

//read data from file express
var jsonData = fs.readFileSync('Express.json');
var library = JSON.parse(jsonData);

const routerTagsOfBook = express.Router()

// Route tags of book
routerTagsOfBook.route('/book/tags')
    // get  uniques tags of all book
    .get((req, res) => {
        let pole = []
        library.map(item => item.tags.map(element => pole.push(element)))
        pole = [...new Set(pole)]

        res.status(200)
            .send(pole)
    })

module.exports = routerTagsOfBook