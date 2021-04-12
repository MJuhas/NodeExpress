const express = require("express") //implement express
const bp = require('body-parser') //read from reg.body
const fs = require('fs'); // read from files
const Joi = require('joi'); // create joi schceme

const app = express()

// read from body via JSON

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))

//read data from file express
var jsonData = fs.readFileSync('Express.json');
var library = JSON.parse(jsonData);

const routerBook = express.Router()

// Route Book 
routerBook.route("/book")
    .get((req, res) => { // get all books
        res.status(200).send(library)
    })
    .post((req, res) => { // post  create a new book

        if (isValidBook(req.body)) {
            let newBook = {...req.body, "id": Math.max(...library.map(item => item.id)) + 1 }
            library.push(newBook)
            fs.writeFileSync('Express.json', (JSON.stringify(library)));

            res.status(200)
                .send(newBook)

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


module.exports = routerBook