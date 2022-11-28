const router = require('express').Router();
const middleware = require('../utils/middleware')

let dao = require('../dataaccess/entry.js');


//Muestra todos los expedientes
router.get("/", async (req, res) => { 
  res.status(200).json(await dao.getAll(req.query));
});


//Muestra un expediente en particular (por id)
router.get("/:id", async (req, res) => {
  const id = req.params.id;
  const data = await dao.getOne(id);

  if (data) {
    res.status(200).json(data);
  } else {
    res.sendStatus(404);
  }
});

//Agregar un expediente
router.post('/', middleware.validarUserLogin, async (req,res)=>{
  const body = {... req.body, user: req.user }
  body.id = body.idfuero+body.numeroexpte+body.anio
  const data = await dao.saveNew(body)
  res.status(200).json(data)
})


//Elimina un expediente
router.delete("/:id", async (req, res) => {
  const id = req.params.id;

  await dao.delOne(id)
  res.sendStatus(202)
}
);

//Modifica un expediente
router.put("/:id", async (req, res) => {
  const id = req.params.id;
 
  if (await dao.updateOne(id, req.body) ) { 
    res.sendStatus(202);
  } else {
    res.sendStatus(404);
  }
});


module.exports = router;