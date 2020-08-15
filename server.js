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

server.get("/course", function (req, res) {
    const id = req.query.id

    const course = courses.find(function(course) {
        return course.id == id
    })
    
    if (!course) {
        return res.render("not-found")
    }

    return res.render("course", { item: course })
})

server.use(function(req, res) {
    res.status(404).render("not-found")
});

server.listen(5501, function () {
    console.log("Server is running")
})