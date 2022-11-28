const {Model, DataTypes} = require('sequelize')
const { sequelize } = require('./../utils/db')

class Fueros extends Model { }

Fueros.init({
    id:{
        type: DataTypes.STRING(10),
        primaryKey: true
    },
    fuero:{
        type: DataTypes.STRING(50),
    }
},{
    sequelize,
    underscored: false,
    modelName: 'fueros'
})

module.exports = Fueros