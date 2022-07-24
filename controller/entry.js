const router = require('express').Router();
const { nextTick } = require('process');
let dao = require('../dataaccess/entry.js');
let allEntries = dao.getAll();

router.get('/', (req,res)=>{
    res.status(200).json(allEntries);
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
    const filtrados = allEntries.filter(elem=>elem.demandado.includes(id));
    res.send(filtrados);
    next();
})

//****** POR FUERO
router.get('/:id', (req, res, next) => {
    const id = req.params.id;
    const filtrados = allEntries.filter(elem=>elem.fuero==id);
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
    allEntries = allEntries.concat(newExpte);
    res.json(newExpte);
})

router.delete('/:id', (req,res)=>{
    const id = req.params.id;
    allEntries = dao.delOne(id);
    res.status(204).json({
        message: "Expte "+id+" eliminado"
    });
})

router.put('/:id', (req,res)=>{
    const id = req.params.id;
    if (dao.updateOne(id,req.body)>=0){
        res.sendStatus(202);
    } else {
        res.sendStatus(404);
    }
});

router.patch('/:id', (req,res)=>{
    res.status(200).json({
        message: 'estoy vivo por el patch'
    });
})

module.exports = router;