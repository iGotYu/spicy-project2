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
  setName: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  rarity: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  img_url: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  tcg_link: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price1Type: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  price1low: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  price1mid: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  price1high: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
  price2Type: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price2low: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  price2mid: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  price2high: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  type1:{
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
