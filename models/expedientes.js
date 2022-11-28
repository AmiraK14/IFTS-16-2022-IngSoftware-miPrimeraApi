const {Model, DataTypes} = require('sequelize')
const { sequelize } = require('./../utils/db')

class Expedientes extends Model { }

Expedientes.init({
    id:{
        type: DataTypes.STRING(30),
        primaryKey: true
    },
    numeroexpte:{
        type: DataTypes.STRING(10),
        allowNull: false,
        isNumeric: true
    },
    anio:{
        type: DataTypes.STRING(10),
        allowNull: false,
        defaultValue: new Date().getFullYear(),
        validate: {
            min:{
                args: 1990,
                msg: 'Debe ingresar un año a partir de 1990. Los años anteriores no se encuentran en este sistema'
            },
            max: {
                args: new Date().getFullYear(),
                msg: 'El año no puede superar al año actual en curso'
            }
        }
    },
    idfuero:{
        type: DataTypes.STRING(10),
        allowNull: false,
        validate:{
            isIn:{
                args:[['CSJ', 'CIV', 'CAF', 'CCF', 'CNE', 'CSS', 'CPE', 'CNT', 'CFP', 'CCC', 'COM', 'CPF', 'CPN', 'FBB', 'FCR', 'FCB', 'FCT', 'FGR', 'FLP', 'FMP', 'FMZ', 'FPO', 'FPA', 'FRE', 'FSA', 'FRO', 'FSM', 'FTU']],
                msg: 'El codigo ingresado no se corresponde a un fuero'
            }
        }
    },
    caratula:{
        type: DataTypes.STRING(200)
    },
    demandado:{
        type: DataTypes.STRING(200)
    },
    juzgado:{
        type: DataTypes.STRING(10)
    },
    secretaria:{
        type: DataTypes.STRING(10)
    }
}, {
    sequelize,
    underscored: false,
    modelName: 'expedientes'
})

module.exports = Expedientes