const router = require('express').Router();
const  Pokemon  = require('../../models/Pokemon');

router.get('/', async (req, res) => {
    try {
        const newPokemon = await Pokemon.findAll({ include: [{model:Pokemon}]
        });
        res.status(200).json(newPokemon);
    }catch (err) {
        res.status(500).json(err);
    }
});

router.get('/:id', async (req, res) => {
    try{
        const newPokemon = await Pokemon.findByPk(req.params.id,{include: [{model:Pokemon}]
        });
        if(!newPokemon){
            res.status(404).json ({message: 'Pokemon id not found'});
            return;
        }
        res.status(200).json(newPokemon);
    }catch (err) {
        res.status(400).json(err);
    }
});

router.post ('/', async (req, res) =>{
    try{
        const newPokemon = await Pokemon.create(req.body);
        res.status(200).json(newPokemon);
    }catch (err) {
        res.status(400).json(err);
    }
});
