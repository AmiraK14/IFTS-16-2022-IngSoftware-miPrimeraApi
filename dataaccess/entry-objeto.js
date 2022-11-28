const { Objetos } = require('../models/');



const getAll = async ()=>{ //entre los parentesis van los filtros
    const datos = await Objetos.findAll()
    return datos
};

const getOne = async (id)=>{return await Objetos.findByPk(id)};

const saveNew = async (body) => {
    const data = {...body}
    const expte = await Objetos.create(data);
    return expte
} 

const delOne = async (id)=>{
    await Objetos.destroy({
        where:{
            id
        }
    })
};

const updateOne = async (id,body) => {
    const data = await getOne(id)
    data.objeto = body.objeto
    await data.save()
    return data
}


module.exports = {getAll, getOne, saveNew, delOne, updateOne};