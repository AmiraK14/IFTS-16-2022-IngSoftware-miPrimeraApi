const jwt = require('jsonwebtoken');
const router = require('express').Router();
require('dotenv').config();

router.post('/', (req,res)=>{
    const {body} = req;
    if (body.username == 'admin' && body.password == '123456'){
        //usuario correcto
        const tokenData = {
            username: body.username,
            id: 1, 
            profile: 'admin'
            //toda la información que quiera referida al usuario MENOS la contraseña
        }
        const token = jwt.sign(tokenData,process.env.JWTSECRET,{expiresIn: '1h'})
        res.status(200).send({token:token, username:'Saul Goodman'})
    } else {
        //usuario incorrecto
        return res.status(401).json({
            error: 'credenciales incorrectas'
        })
    }
})

router.delete('/:id', (req,res)=>{
    const {body} = req;
    if (body.username == 'admin' && body.password == '123456'){
        //usuario correcto
        const tokenData = {
            username: body.username,
            id: 1, 
            profile: 'admin'
            //toda la información que quiera referida al usuario MENOS la contraseña
        }
        const token = jwt.sign(tokenData,process.env.JWTSECRET,{expiresIn: '1h'})
        res.status(200).send({token:token, username:'Saul Goodman'})
    } else {
        //usuario incorrecto
        return res.status(401).json({
            error: 'credenciales incorrectas'
        })
    }
})

router.put('/:id', (req,res)=>{
    const {body} = req;
    if (body.username == 'admin' && body.password == '123456'){
        //usuario correcto
        const tokenData = {
            username: body.username,
            id: 1, 
            profile: 'admin'
            //toda la información que quiera referida al usuario MENOS la contraseña
        }
        const token = jwt.sign(tokenData,process.env.JWTSECRET,{expiresIn: '1h'})
        res.status(200).send({token:token, username:'Saul Goodman'})
    } else {
        //usuario incorrecto
        return res.status(401).json({
            error: 'credenciales incorrectas'
        })
    }
})

module.exports = router