const fs = require('fs')
const data = require('../data.json')

//create get
exports.create = (req,res)=>{
    return res.render("cliente/create")
}

// index
exports.index = function(req, res){
    return res.render("cliente/index", {cliente: data.fiado})
}

//show

exports.show = function(req,res){
    const {id} = req.params

    const foundCliente = data.fiado.find(function(cliente){
        return cliente.id == id
    })

    if(!foundCliente) return res.send("cliente não encontrado")

    const cliente = {
        ...foundCliente
    }

    return res.render("cliente/show", {cliente})
}

// create
exports.post = (req,res)=>{

    const keys = Object.keys(req.body)

    for (key of keys){
        if(req.body[key] == ""){
            return res.send('insira o campo em branco por favor!')
        }
    }

    let {name, valor, avatar} = req.body

    const id = Number(data.fiado.length + 1)
    
    const constructorFiado = {
        valor: Number(valor)
    }

    data.fiado.push({
        ...constructorFiado,
        id,
        name,
        avatar
    })

    fs.writeFile("data.json", JSON.stringify(data,null,2),(err)=>{
        if(err) return res.send('erro writeFile')

        return res.redirect("/cliente")
    })

}

//edit

exports.edit = (req,res)=>{
    const {id}  = req.params

    const foundCliente = data.fiado.find((cliente)=>{
        return cliente.id == id
    })

    if (!foundCliente)return res.send('cliente não encontrado')

    const cliente = {
        ...foundCliente
    }

    return res.render('cliente/edit', { cliente })
}

//put
exports.put = (req,res)=>{
    const {id} = req.body
    let index = 0

    const foundCliente = data.fiado.find((cliente,foundIndex)=>{
        if(id == cliente.id){
            index = foundIndex
            return true
        }
    })

    if(!foundCliente) return res.send('cliente não encontrado')

    const cliente = {
        ...foundCliente,
        id: Number(req.body.id)
    }

    data.fiado[index] = cliente

    fs.writeFile("data.json",JSON.stringify(data,null,2),(err)=>{
        if(err) return res.send("erro ao escrever arquivo")

        return res.redirect(`/cliente/${id}`)
    })
}