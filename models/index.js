const Fueros = require('./fueros')
const Expedientes = require('./expedientes')
const Objetos = require('./objetos')

//Expedientes.belongsTo(Fueros)
Expedientes.belongsTo(Objetos)
//Fueros.hasMany(Expedientes)
Objetos.hasMany(Expedientes)

/*

Relacion n..n
Post.belongsTo(Categoria,{through:'post_categoria'})
Categoria.belongsTo(Post,{through:'post_categoria'})

{through:'post_categoria'} --> genera la tabla intermedia

*/

module.exports = {
    Expedientes, Fueros, Objetos
}