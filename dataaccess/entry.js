const { Expedientes, Objetos } = require('../models/');



const getAll = async (filter)=>{ //entre los parentesis van los filtros
    let options = {
        attributes: ['numeroexpte', 'anio', 'caratula', 'idfuero', 'juzgado', 'secretaria'], //--> indica solo los campos que se mostraran
        include: [
            {model: Objetos,
            attributes: ['objeto']}
        ]
    }
    if (filter.anio)
    options = {
        ...options,where:{
            ...options.where,
            anio: filter.anio
        }
    }
    if (filter.juzgado)
    options = {
        ...options,where:{
            ...options.where,
            juzgado: filter.juzgado
        }
    }
    if (filter.idfuero)
    options = {
        ...options,where:{
            ...options.where,
            idfuero: filter.idfuero
        }
    }
    if (filter.demandado)
    options = {
        ...options,where:{
            ...options.where,
            demandado: filter.demandado
        }
    }
    
    const datos = await Expedientes.findAll(options)
    return datos
};

const getOne = async (id)=>{
    return await Expedientes.findByPk(id, {
        attributes: ['numeroexpte', 'anio', 'caratula', 'idfuero', 'juzgado', 'secretaria'],
        include: [
            {model: Objetos, 
            attributes: ['objeto']},
        ]
    })};


const saveNew = async (body) => {
    const data = {...body}
    const expte = await Expedientes.create(data);
    if (body.objeto){
        let objeto = {}
        if(body.objeto.id){
            objeto = await Objetos.findByPk(body.objeto.id) 
        } else {
            //objeto = await Objetos.create(body.objeto)
            objeto = await Objetos.findOne({ where: { objeto: body.objeto.objeto } });
            if (objeto === null) {
                objeto = await Objetos.create(body.objeto)
              }
        }
        expte.objetoId = objeto.id
        await expte.save()
    }
    return expte
} 

const delOne = async (id)=>{
    await Expedientes.destroy({
        where:{
            id
        }
    })
};

const updateOne = async (id,body) => {
    const data = await getOne(id)
    data.id = id
    if (body.caratula){
        data.caratula = body.caratula
    }
    if (body.demandado){
        data.demandado = body.demandado
    }
    if (body.juzgado){
        data.juzgado = body.juzgado
    }
    if (body.secretaria){
        data.secretaria = body.secretaria
    }
    if (body.objeto){
        let objeto = {}
        if(body.objeto.id){
            objeto = await Objetos.findByPk(body.objeto.id) 
        } else {
            objeto = await Objetos.create(body.objeto)
        }
        data.objetoId = objeto.id
    }
    await data.save()
    return data
}


module.exports = {getAll, getOne, saveNew, delOne, updateOne};