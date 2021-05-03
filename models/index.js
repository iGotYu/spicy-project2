const Pokemon = require('./Pokemon');
const User = require('./User');
const Connecter = require('./Connecter');
const { BelongsTo } = require('sequelize/types');


User.hasMany(Pokemon, {through: Connecter,
foreignKey: 'pokemon_id'
});
//pokemon belongs to many users through connector 
Pokemon.belongsToMany (User, {through: Connecter,
foreignKey: 'user_id'
});