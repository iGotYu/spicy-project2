const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection.js');

class Connecter extends Model {}

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
    // user_id: {
    //     type: DataTypes.STRING,
    //     reference : {
    //         model:'user',
    //         key: 'id',
    //     },
    // },
    // pokemon_id:{
    //     type: DataTypes.STRING,
    //     reference : {
    //         model:'pokemon',
    //         key:'id',
    //     },
    // },
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