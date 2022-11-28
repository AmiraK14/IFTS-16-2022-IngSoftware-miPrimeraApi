const Sequelize = require('sequelize')

const sequelize = new Sequelize(
    'pruebaBD', //nombre de la bd
    'root', //usuario
    '',//password
    {  //datos de conexion
        host: 'localhost',
        port: '3306',
        dialect: 'mariadb'
    }
)

const connectDb = async () => {
    try {
        await sequelize.authenticate()
        console.log('conectado a la base de datos') 
    } catch (error) {
        console.log('ERROR:', error)
        return process.exit()
    }
}

module.exports = {connectDb, sequelize}