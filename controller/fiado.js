const fs = require('fs')
const data = require('../data.json')

//create get
exports.create = (req,res)=>{
    return res.render("cliente/create")
}


// create
exports.post = (req,res)=>{

    const keys = Object.keys(req.body)

    for (key of keys){
        if(req.body[key] == ""){
            return res.send('insira o campo em branco por favor!')
        }
    }

    let {name, valor} = req.body

    const id = Number(data.fiado.length + 1)
    
    data.fiado.push({
        id,
        name,
        valor
    })

    fs.writeFile("data.json", JSON.stringify(data,null,2),(err)=>{
        if(err) return res.send('erro writeFile')

        return res.redirect("/cliente")
    })

}