const Pokemon = require('./Pokemon');
const User = require('./User');
const Connecter = require('./Connecter');


// User.hasMany(Pokemon, {through: Connecter,
// foreignKey: 'grade'
// });
// //pokemon belongs to many users through connector 
// Pokemon.belongsToMany (User, {through: Connecter,
// foreignKey: 'user_id'
// });

User.hasMany(Connecter);

Pokemon.hasMany(Connecter);

Connecter.belongsTo(User);

Connecter.belongsTo(Pokemon);

module.exports = {User, Pokemon, Connecter}