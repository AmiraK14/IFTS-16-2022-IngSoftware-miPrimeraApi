const router = require('express').Router();
const middleware = require('../utils/middleware')
const { nextTick } = require('process');
let dao = require('../dataaccess/entry.js');
const { query } = require('express');
let allEntries = dao.getAll(query);

router.get('/', (req,res)=>{
  //console.log('DEMANDADO: '+req.query.demandado);
  //console.log('FUERO: '+req.query.fuero);
  //console.log('CANTIDAD: '+Object.keys(req.query).length);
  const query = req.query;
  console.log(query);
  let filtrados;
  if (req.query.demandado!==undefined){
    filtrados = allEntries.filter(elem=>elem.demandado.includes(query.demandado));
    console.log(filtrados);
  }
  if (req.query.anio!==undefined){
    filtrados = allEntries.filter(elem=>elem.anio.toString()===query.anio);
  }
  if (req.query.fuero!==undefined){
    filtrados = allEntries.filter(elem=>elem.fuero===query.fuero);
  }
  if (req.query.caratula!==undefined){
    filtrados = allEntries.filter(elem=>elem.caratula.includes(query.caratula));
  }
  if (req.query.juzgado!==undefined){
    filtrados = allEntries.filter(elem=>elem.juzgado.toString()===query.juzgado);
  }
  if (req.query.secretaria!==undefined){
    filtrados = allEntries.filter(elem=>elem.secretaria.toString()===query.secretaria);
  }

  if (Object.keys(req.query).length===0){
    res.status(200).json(allEntries);
  } else {
    res.send(filtrados);
  }
});


//MUESTRA UN SOLO ELEMENTO, SEGUN SU ID
router.get('/:id', (req,res,next) =>{
    const id = req.params.id;
    const elem = dao.getOne(id);
    if (elem){
      res.send(elem);
    } else {
      next();
    }
})

//FILTROS
//****** POR DEMANDADO
/*router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const filtrados = allEntries.filter(elem=>elem.demandado.includes(id));
    res.send(filtrados);
    next();
})*/

//****** POR FUERO
/*router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const filtrados = allEntries.filter(elem=>elem.fuero==id);
    res.send(filtrados);
    next();
})*/



//POST CON USUARIO LOGUEADO
router.post('/', middleware.validarUserLogin, (req,res)=>{
    let expte = req.body;
    if (!expte || expte.numeroExpte == undefined || expte.anio == undefined || expte.fuero == undefined){
      return res.status(400).json({
        error: 'No se ha ingresado un nuevo expediente'
      })
    }
    let newExpte = {
      id: expte.fuero+expte.numeroExpte+expte.anio,
      numeroExpte: expte.numeroExpte,
      anio: expte.anio,
      fuero: expte.fuero,
      caratula: expte.caratula,
      demandado: expte.demandado,
      juzgado: expte.juzgado,
      secretaria: expte.secretaria,
      user: req.user
    }
    console.log(newExpte);
    allEntries = allEntries.concat(newExpte);
    res.json(newExpte);
})


router.delete('/:id', middleware.validarUserLogin, (req,res)=>{
    const id = req.params.id;
    allEntries = dao.delOne(id);
    res.status(204).json({
        message: "Expte "+id+" eliminado"
    });
})

router.put('/:id', middleware.validarUserLogin, (req,res)=>{
    const id = req.params.id;
    if (dao.updateOne(id,req.body)){
        res.sendStatus(202);
    } else {
        res.sendStatus(404);
    }
});


module.exports = router;