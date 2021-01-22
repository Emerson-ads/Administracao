const express = require('express')
const nunjucks = require('nunjucks')
const fiado = require('./controller/fiado')
const methodoOverrride = require('method-override')

const server = express()

//config 
server.use(express.urlencoded({ extended: true}))
server.use(express.static("public"))
server.set("view engine", "njk")
server.use(methodoOverrride('_method'))

nunjucks.configure("views", {
    express: server,
    autoescape: false,
    noCache: true
})

//redirecionar
server.get('/', (req,res)=>{
    return res.redirect("/cliente")
})

//página index
server.get('/cliente',fiado.index)

//pagina create get
server.get('/cliente/create',(req,res)=>{
    return res.render("cliente/create")
})

//pagina show

server.get('/cliente/:id',fiado.show)

//pagina create post
server.post('/cliente',fiado.post)


//edit
server.get('/cliente/:id/edit',fiado.edit)

//put
server.put('/cliente', fiado.put)

server.listen(5000, function(){
    console.log('server is running')
})