const consoleData = (req,res,next)=> {
    console.log('Method: '+req.method);
    console.log('Path: '+req.path);
    console.log('Body: ',req.body);
    console.log('---------------');
    next();
};

const getIndex = (req,res)=>{
    res.send('<h1>CINE 3.0</h1><h3>Bienvenidos a la videoteca mas completa de la web</h3>');
}

const getListadoPeliculas = (req,res)=>{
    res.send('Hola, estas son las peliculas');
}


const unknownEndpoint = (req,res)=> {
    res.status(404).send({error:"unknown endpoint"});
}

module.exports = {consoleData, unknownEndpoint, getIndex, getListadoPeliculas};