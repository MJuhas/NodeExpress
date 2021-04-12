const express = require("express")
const fs = require('fs'); // read from files
const bp = require('body-parser') // body parser
const app = express()
const Joi = require('joi'); // create joi schceme

// read from body via via JSON
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

//read data from file express
var jsonData = fs.readFileSync('Express.json');
var library = JSON.parse(jsonData);

const routerBookById = express.Router()

// Route BookById
routerBookById.route("/book/:id")
    .get((req, res) => { // get  books by ID     

        let searchId = library.findIndex(item => item.id == req.params.id)

        if (!/^[0-9]+$/.test(req.params.id)) {
            res.status(400)
                .send(" Invalid ID format supplied")
        } else if (searchId > -1) {
            res.status(200)
                .send(library[searchId])
        } else {
            res.status(404)
                .send("Book not found")

        }
    })
    .delete((req, res) => { // delete  delete a book

        let searchId = library.findIndex(item => item.id == req.params.id)

        if (!/^[0-9]+$/.test(req.params.id)) {
            res.status(400)
                .send(" Invalid ID format supplied")
        } else if (searchId > -1) {
            let deteteBook = library[searchId]
            library.splice(searchId, 1)
            fs.writeFileSync('Express.json', (JSON.stringify(library)));
            res.status(200)
                .send(deteteBook)
        } else {
            res.status(404)
                .send("Book not found")
        }

    })
    .put((req, res) => { // put  upgrate a book

        let searchId = library.findIndex(item => item.id == req.params.id)

        if (!/^[0-9]+$/.test(req.params.id)) {
            res.status(400)
                .send(" Invalid ID format supplied")
        } else if (searchId == -1) {
            res.status(404)
                .send("Book not found")
        }

        if (isValidBook(req.body)) {
            Object.assign(library[searchId], {...req.body, "id": req.params.id })
            fs.writeFileSync('Express.json', (JSON.stringify(library)));
            res.status(200)
                .send(library[searchId])
        } else {
            res.status(405)
                .send("New book not valid")

        }
    })




const isValidBook = (book) => {

    const bookSchema = Joi.object({
        title: Joi.string().required(),
        author: Joi.string().required(),
        pages: Joi.number().required(),
        tags: Joi.array().items(Joi.string()).required()
    })

    return bookSchema.validate(book).error ? false : true;
}

module.exports = routerBookById