const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const courses = require("./data")

server.use(express.static('public'))

server.set("view engine", "njk")

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

server.get("/", function (req, res) {
    return res.render("index")
})

server.get("/content", function (req, res) {
    return res.render("content", { items: courses })
})

server.listen(5501, function () {
    console.log("Server is running")
})