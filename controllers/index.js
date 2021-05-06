const axios = require("axios");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User, Pokemon, Connecter } = require("../models");

router.get("/", (req, res) => {
  res.render("homepage", { isLoggedIn: req.session.user ? true : false });
});

router.get("/dashboard", (req, res) => {

const thisUser = User.findByPk(req.session.user.id, {
    include: [
      {
      model: Connecter,
      include: [Pokemon]
      }
  ]}
).then((myPokemons) => {
  console.log(myPokemons);
  const allPokemons = myPokemons.connecters.map((poke) => poke.get({plain: true}));
  const yourPokes = allPokemons.map(pokemon =>pokemon.pokemon);

  res.render("dashboard", { 
    isLoggedIn: req.session.user ? true : false,
    userName: req.session.user.userName,
    pokemon: yourPokes});
});

});
router.post("/login", (req, res) => {
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((foundUser) => {
    if (!foundUser) {
      req.session.destroy();
      return res.status(401).send("Login Failed");
    }
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      console.log(foundUser.dataValues.id)
      req.session.user = {
        //userName:foundUser.userName,
        email: foundUser.email,
        id: foundUser.dataValues.id,
      };
      return res.json(foundUser);
    }
  });
});
router.post("/signup", (req, res) => {
  User.create({
    //userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  })
    .then((newUser) => {
      req.session.user = {
        //userName: newUser.userName,
        email: newUser.email,
        id: newUser.id,
      };
      res.json(newUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
});

router.get("/logout", (req, res) => {
  req.session.destroy();
  res.render("homepage");
});

router.get("/chart", (req, res) => {
  res.render("graph", { isLoggedIn: req.session.user ? true : false });
});

router.get("/search", (req, res) => {
  res.render("search", { isLoggedIn: req.session.user ? true : false });
});

// search by type: https://api.pokemontcg.io/v2/cards?q=types:"${type}"

//search by rarity: https://api.pokemontcg.io/v2/cards?q=rarity:"${rarity}"

router.get("/search/:name/:type", (req, res) => {
  const name = req.params.name;
  const type = req.params.type;
  console.log(name, type);
  const urlToFetch = `https://api.pokemontcg.io/v2/cards?q=name:"${name}"%20subtypes:"${type}"`;
  axios.defaults.headers.common["X-Api-Key"] =
    "7397e20d-407f-4487-b7a4-e70011172529";
  axios
    .get(urlToFetch)
    .then((data) => {
      let allData = data.data.data;
      // console.log(allData);
      res.render("search", {
        isLoggedIn: req.session.user ? true : false,
        card: allData,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});


router.get("/search/:name", (req, res) => {
  const { name } = req.params;
  console.log(name);
  const urlToFetch = `https://api.pokemontcg.io/v2/cards?q=name:"${name}"`;
  axios.defaults.headers.common["X-Api-Key"] =
    "7397e20d-407f-4487-b7a4-e70011172529";
  axios
    .get(urlToFetch)
    .then((data) => {
      let allData = data.data.data;
      // console.log(allData);
      res.render("search", {
        isLoggedIn: req.session.user ? true : false,
        card: allData,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

router.post("/api/connecter", async (req, res) => {
  // console.log(req.session.user.id);
  let foundPokemon = await Pokemon.findOne({
    where: {
      tcg_id: req.body.tcg_id,
    },
  });
  if (foundPokemon) {
    let newPokemon = await Connecter.create({
      grade: req.body.grade,
      pokemonId: foundPokemon.id,
      userId: req.session.user.id,
    });
    res.json(newPokemon);
  } else {
    const urlToFetch = `https://api.pokemontcg.io/v2/cards/${req.body.tcg_id}`;
    axios.defaults.headers.common["X-Api-Key"] =
      "7397e20d-407f-4487-b7a4-e70011172529";
    const result = await axios.get(urlToFetch);
    const firstPriceType = Object.keys(result.data.data.tcgplayer.prices)[0];
    const secondPriceType = Object.keys(result.data.data.tcgplayer.prices)[1];
    const firstType = Object.keys(result.data.data.types)[0];
    console.log(secondPriceType);
    if(secondPriceType) {
      let createPokemon = await Pokemon.create({
      tcg_id: result.data.data.id,
      name: result.data.data.name,
      setName: result.data.data.set.name,
      rarity: result.data.data.rarity,
      img_url: result.data.data.images.small,
      tcg_link: result.data.data.tcgplayer.url,
      price1Type: firstPriceType,
      price1low: result.data.data.tcgplayer.prices[firstPriceType].low,
      price1mid: result.data.data.tcgplayer.prices[firstPriceType].mid,
      price1high: result.data.data.tcgplayer.prices[firstPriceType].high,
      price2Type: secondPriceType,
      price2low: result.data.data.tcgplayer.prices[secondPriceType].low,
      price2mid: result.data.data.tcgplayer.prices[secondPriceType].mid,
      price2high: result.data.data.tcgplayer.prices[secondPriceType].high,
      type1: result.data.data.types[firstType],
    });
    // console.log(createPokemon);
    // console.log(createPokemon.id);
    
    // console.log(req.session.user.id)
    let newConnecter = await Connecter.create({
      grade: req.body.grade,
      pokemonId: createPokemon.id,
      userId: req.session.user.id,
    });
    res.json(newConnecter);
    } else {
      let createPokemon = await Pokemon.create({
        tcg_id: result.data.data.id,
        name: result.data.data.name,
        setName: result.data.data.set.name,
        rarity: result.data.data.rarity,
        img_url: result.data.data.images.small,
        tcg_link: result.data.data.tcgplayer.url,
        price1Type: firstPriceType,
        price1low: result.data.data.tcgplayer.prices[firstPriceType].low,
        price1mid: result.data.data.tcgplayer.prices[firstPriceType].mid,
        price1high: result.data.data.tcgplayer.prices[firstPriceType].high,
        type1: result.data.data.types[firstType],
      });
      console.log(createPokemon);
      console.log(createPokemon.id);
      console.log(req.session.user.id)
      let newConnecter = await Connecter.create({
        grade: req.body.grade,
        pokemonId: createPokemon.id,
        userId: req.session.user.id,
      });
      res.json(newConnecter);
    }
    
    // console.log(createPokemon);
    // console.log(createPokemon.id);
    // console.log(req.session.user.id)
    // let newConnecter = await Connecter.create({
    //   grade: req.body.grade,
    //   pokemonId: createPokemon.id,
    //   userId: req.session.user.id,
    // });
   }
});

module.exports = router;
