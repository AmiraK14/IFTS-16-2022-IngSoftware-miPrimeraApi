const router = require('express').Router();
const { nextTick } = require('process');
let dao = require('../dataaccess/entry.js');

router.get('/', (req,res)=>{
    console.log(dao.getAll);
    res.status(200).json(dao.getAll());
})

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
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const filtrados = dao.getAll().filter(elem=>elem.demandado.includes(id));
    res.send(filtrados);
    next();
})

//****** POR FUERO
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const filtrados = dao.getAll().filter(elem=>elem.fuero==id);
    res.send(filtrados);
    next();
})


router.post('/', (req,res)=>{
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
      secretaria: expte.secretaria
    }
    console.log(newExpte);
    exptes = dao.getAll().concat(newExpte);
    res.json(newExpte);
})

router.delete('/', (req,res)=>{
    const id = req.params.id;
    exptes = dao.getAll().filter(elem => elem.id!=id);
    res.status(204).end();
})


router.put('/', (req,res)=>{
    res.status(200).json({
        message: 'estoy vivo por el put'
    });
})

router.get('/:id', (req,res)=>{
    res.status(200).json({
        message: 'estoy vivo por el get'
    });
})

router.post('/:id', (req,res)=>{
    res.status(200).json({
        message: 'estoy vivo por el post'
    });
})

router.delete('/', (req,res)=>{
    res.status(200).json({
        message: 'estoy vivo por el delete'
    });
})

router.put('/:id', (req,res)=>{
    const id = req.params.id;
    const index = exptes.findIndex((elem)=>elem.id==id);
    if (index>=0){
        exptes[index]=req.body;
        res.sendStatus(202);
    } else {
        res.sendStatus(404);
    }
})

router.patch('/:id', (req,res)=>{
    res.status(200).json({
        message: 'estoy vivo por el patch'
    });
})

module.exports = router;