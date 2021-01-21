const express = require('express')
const router = express.Router()
const fiado = require('./controller/fiado')

router.get('/', function(req,res){
    return res.redirect("/")
})