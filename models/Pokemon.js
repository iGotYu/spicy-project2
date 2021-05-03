const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection.js");

class Pokemon extends Model {}

Pokemon.init({
  id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subtypes1: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  subtypes2: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  img_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tcg_link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  priceslow: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  pricesmid: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  pricehigh: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  type:{
      type: DataTypes.STRING,
      allowNull: false,
  },
  type2 :{
      type: DataTypes.STRING,
      allowNull: true,
  },
 
},
{
    sequelize,
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'pokemon',
  });

module.exports = Pokemon;
