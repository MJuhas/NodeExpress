const express = require("express")
const app = express()
const bp = require('body-parser')

app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))



// import your module 
const routerBook = require("./routerBook")
const routerBookById = require("./routerBookById")
const routerTagsOfBook = require("./routerTagsOfBook")

// implement your modul "Router URI with endpoints"
app.use(routerBook, routerTagsOfBook, routerBookById)




app.listen(3000, () => {
    console.log(`Example app listening at http://localhost:3000`)
})