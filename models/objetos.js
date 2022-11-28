const {Model, DataTypes} = require('sequelize')
const { sequelize } = require('./../utils/db')

class Objetos extends Model { }

Objetos.init({
    id:{
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    objeto:{
        type: DataTypes.STRING(100),
        allowNull: false
    }
},{
    sequelize,
    underscored: false,
    modelName: 'objetos'
})

module.exports = Objetos