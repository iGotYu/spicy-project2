const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection.js');

class Connecter extends Model {}
//the Connecter class will bridge our Users and our Pokemon, it will also contain specific card data like grade and sale information
Connecter.init ({ 
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    grade: {
        type: DataTypes.INTEGER,
        allowNull: false,
    },
    sold: {
        type: DataTypes.BOOLEAN,
        default: false,
    },
    sale: {
        type: DataTypes.DECIMAL(10,2),
        allowNull: true,
    },
    saleDate: {
        type: DataTypes.DATE,
        allowNull: true,
    }
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'connecter',
  }
);

module.exports = Connecter;