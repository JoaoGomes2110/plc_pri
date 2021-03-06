var Evento = require('../models/evento')
const Eventos = module.exports

//Lista todos os Eventos
Eventos.listar = () =>{
    return Evento
        .find()
        .sort({data: 1})
        .exec()
}

//Lista os Eventos por um dado tipo
Eventos.listarTipo = tipo =>{
    return Evento
        .find({tipo: tipo})
        .sort({data: -1})
        .exec()
}

//Lista os Eventos por ordem decrescente, maiores que uma dada data
Eventos.listarData = data =>{
    return Evento
        .find({data: {$gte: data}})
        .sort({data: -1})
        .exec()
}

//Lista todos os Eventos de uma data especifica
Eventos.listarDataExacta = data =>{
    return Evento
        .find({data:  data})
        .sort({data: -1})
        .exec()
}

// Lista a informação de um Evento dado um id
Eventos.consultar = eid =>{
    return Evento
        .findOne({_id: eid})
        .exec()
}

//Insere um novo evento
Eventos.inserir = async e =>{
    var eve = await Evento.findOne()
                          .sort({_id: -1})
                          .limit(1)
                          .exec()
    if(eve == null){
        var id = 1
    }
    else{
        var id = eve._id + 1
    }
    var evento = new Evento({
        _id: id,
        data: e.data,
        horario: { hinicio: e.hinicio, hfim: e.hfim},
        tipo: e.tipo,
        designacao: e.designacao,
        local: e.local,
        informacao: e.informacao
    })
    return Evento.create(evento)
}

Eventos.inserirPorFicheiro = async e =>{
    var eve = await Evento.findOne()
                          .sort({_id: -1})
                          .limit(1)
                          .exec()
    
    if(eve == null){
        var id = 1
    }
    else{
        var id = eve._id + 1
        
    }
    var evento = new Evento({
        _id: id,
        data: e.data,
        horario: { hinicio: e.horario.hinicio, hfim: e.horario.hfim},
        tipo: e.tipo,
        designacao: e.designacao,
        local: e.local,
        informacao: e.informacao
    })
    return Evento.create(evento)
}


//Remove um evento, dado o seu id
Eventos.remover = eid => {
   return Evento.findOneAndRemove({_id: eid},(erro,doc) =>{
        if(!erro){
            console.log('Evento removido com sucesso!')
        }
        else{
            console.log('Erro: Evento não removido!')
        }
    })
}

//Atualiza um evento, dado um evento completo
Eventos.atualizar = e =>{
    return Evento.findOneAndUpdate({_id:e.id},{$set:{data:e.data,horario:{hinicio: e.hinicio, hfim: e.hfim},tipo: e.tipo,designacao: e.designacao,local: e.local,informacao: e.informacao}},{new: true},(erro,doc)=>{
        if(!erro){
        }
        else{
            console.log('Não consegui atualizar evento')
        }
    })
}


