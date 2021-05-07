const { Model, DataTypes} = require('sequelize');
const sequelize = require('../config/connection.js');
const bcrypt = require('bcrypt');

class User extends Model{};
//User model will primarily use email and password for logging in, encrypt the password when creating a new User
User.init({
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
    } 
},{
    sequelize,
    hooks:{
        beforeCreate: async(newUser) => {
            newUser.password=await bcrypt.hash(newUser.password,10);
        }
    },
    timestamps: false,
    freezeTableName: true,
    underscored: true,
    modelName: 'user',
  }
);

module.exports = User;

