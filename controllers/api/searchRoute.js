const router = require('express').Router();
const { Pokemon } = require('../../models/Pokemon');

router.post('/', async (req, res) =>{
    try{
        const newPokemon = await Pokemon.create(req.body);

        req.session.save(()=>{
            req.
        })
    }
})