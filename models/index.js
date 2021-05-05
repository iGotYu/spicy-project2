const Pokemon = require('./Pokemon');
const User = require('./User');
const Connecter = require('./Connecter');


User.hasMany(Connecter);

Pokemon.hasMany(Connecter);

Connecter.belongsTo(User);

Connecter.belongsTo(Pokemon);

module.exports = {User, Pokemon, Connecter}