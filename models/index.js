const Pokemon = require('./Pokemon');
const User = require('./User');
const Connecter = require('./Connecter');
const { BelongsTo } = require('sequelize/types');


User.hasMany(Connecter);

Pokemon.hasMany(Connecter);

Connecter.belongsTo(User);

Connecter.belongsTo(Pokemon);