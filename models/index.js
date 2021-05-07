const Pokemon = require('./Pokemon');
const User = require('./User');
const Connecter = require('./Connecter');



//the Connector will bridge our Users and our Pokemon, we will let sequelize generate foreign key associations automatically
User.hasMany(Connecter);
Pokemon.hasMany(Connecter);

Connecter.belongsTo(User);
Connecter.belongsTo(Pokemon);

module.exports = {User, Pokemon, Connecter}