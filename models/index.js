const Pokemon = require('./Pokemon');
const User = require('./User');
const Connecter = require('./Connecter');
const { BelongsTo } = require('sequelize/types');

Pokemon.belongsToMany

User.hasMany(Pokemon, {through: Connecter,
forignKey: 'pokemon_id'
});
//pokemon belongs to many users through connector 
Pokemon.belongsToMany (User, {through: Connecter,
forignKey: 'user_id'
});