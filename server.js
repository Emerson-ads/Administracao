const express = require('express')
const nunjucks = require('nunjucks')


const server = express()

//config 
server.use(express.urlencoded({ extended: true}))
server.use(express.static("public"))
server.set("view engine", "njk")


nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})


server.get('/', (req,res)=>{
    return res.redirect("/instructors")
})

server.get('/instructors',function(req, res){
    return res.render("instructors/index")
})


server.listen(5000, function(){
    console.log('server is running')
})