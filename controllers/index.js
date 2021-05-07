const axios = require("axios");
const router = require("express").Router();
const bcrypt = require("bcrypt");
const { User, Pokemon, Connecter } = require("../models");

//render the homepage when you navigate to the / route
router.get("/", (req, res) => {
  res.render("homepage", { isLoggedIn: req.session.user ? true : false });
});

//render the users dashboard
router.get("/dashboard", (req, res) => {
  try{ 
    //find the current user and get their pokemon through the connector table
  const thisUser = User.findByPk(req.session.user.id, {
    include: [
      {
        model: Connecter,
        include: [Pokemon],
      },
    ],
  }).then((myPokemons) => {
    //map the data into an object that is easier to use
    const allPokemons = myPokemons.connecters.map((poke) =>
      poke.get({ plain: true })
    );

    //render dashboard.handlebars, let the page know that a user is a logged in, and pass all the relevant pokemon data
    res.render("dashboard", {
      isLoggedIn: req.session.user ? true : false,
      userName: req.session.user.userName,
      pokemon: allPokemons,
    });
  });
  } catch (err) {
    //something went wrong, likely the user tried to navigate to the dashboard without logging in
    res.render('homepage');
  }
});

//send the user here when they are trying to log in
router.post("/login", (req, res) => {
 try{
  User.findOne({
    where: {
      email: req.body.email,
    },
  }).then((foundUser) => {
    //that user wasnt found, lets logout anyone who may still be logged in
    if (!foundUser) {
      req.session.destroy();
      return res.status(401).send("Login Failed");
    }
    //we found a matching email, lets check to see if they're encrypted passwords are a match
    if (bcrypt.compareSync(req.body.password, foundUser.password)) {
      req.session.user = {
        email: foundUser.email,
        id: foundUser.dataValues.id,
      };
      return res.json(foundUser);
    } else {
      return res.status(400).send("Login Failed");
    }
  });
}catch (err) {
  res.render('homepage');
}
});

//create a new account when you click the signup button
router.post("/signup", (req, res) => {
 try{
  User.create({
    email: req.body.email,
    password: req.body.password,
  })
    .then((newUser) => {
      //set the session user as the newly signed up account
      req.session.user = {
        email: newUser.email,
        id: newUser.id,
      };
      res.json(newUser);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json(err);
    });
}catch (err) {
  res.render('homepage');
}
});

//end the current session
router.get("/logout", (req, res) => {
  req.session.destroy();
  res.render("homepage");
});

//render the graph.handlebars page
router.get("/chart", (req, res) => {
  res.render("graph", { isLoggedIn: req.session.user ? true : false });
});

//get Users Connecter data to display in the chart
router.get("/api/chart", (req, res) => {
 try{
  const myUser = User.findByPk(req.session.user.id, {
    include: [
      {
        model: Connecter,
      },
    ],
  }).then((data) => {
    // format the data so its easier to use
    const allMyPokemon = data.connecters.map((poke) =>
      poke.get({ plain: true })
    );
    //grab the sale price and sale date of the users cards
    const yourSales = allMyPokemon.map((pokemon) => pokemon.sale);
    const yourDates = allMyPokemon.map((pokemon) => pokemon.saleDate);
    //send the data to the script to display
    res.json({yourSales, yourDates });
  });
}catch (err) {
  res.render("dashboard", {isLoggedIn: req.session.user ? true : false})
}
});

//render the search page
router.get("/search", (req, res) => {
  //console.log(req.session.user);
  res.render("search", { isLoggedIn: req.session.user ? true : false });
});

//this route will get called from the advanced search and uses two parameters
router.get("/search/:name/:type", (req, res) => {
  //grab the requested search parameters and create a fetch url
  const name = req.params.name;
  const type = req.params.type;
  const urlToFetch = `https://api.pokemontcg.io/v2/cards?q=name:"${name}"%20subtypes:"${type}"`;
  axios.defaults.headers.common["X-Api-Key"] =
    "7397e20d-407f-4487-b7a4-e70011172529";
    //use axios to fetch the requested information
  axios
    .get(urlToFetch)
    .then((data) => {
      let allData = data.data.data;
      //render the search page with all of the matching cards
      res.render("search", {
        isLoggedIn: req.session.user ? true : false,
        card: allData,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

//thus route will get called from the quick search on the nav bar
router.get("/search/:name", (req, res) => {
  //get the requested search query and create a fetch url
  const { name } = req.params;
  const urlToFetch = `https://api.pokemontcg.io/v2/cards?q=name:"${name}"`;
  axios.defaults.headers.common["X-Api-Key"] =
    "7397e20d-407f-4487-b7a4-e70011172529";
  //use axios to get the matching cards
  axios
    .get(urlToFetch)
    .then((data) => {
      let allData = data.data.data;
      //render the search page with the matching cards
      res.render("search", {
        isLoggedIn: req.session.user ? true : false,
        card: allData,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

//this route will be used to update the connecter when Users sell a card on the dashboard
router.put("/api/connecter", async (req, res) => {
  let sellPokemon = await Connecter.update(
    {
      sale: req.body.sale,
      sold: req.body.sold,
      saleDate: req.body.saleDate,
    },
    {
      where: {
        user_id: req.session.user.id,
        pokemon_id: req.body.pokemon_id,
      },
    }
  );
  res.json(sellPokemon);
});

//this route will be used when a User saves a new card from the search page
router.post("/api/connecter", async (req, res) => {
  //first lets check to see if the current card already exists in our table, if so build a new connecter
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
    //the card does not exist in our table, lets fetch that specific card information
    const urlToFetch = `https://api.pokemontcg.io/v2/cards/${req.body.tcg_id}`;
    axios.defaults.headers.common["X-Api-Key"] =
      "7397e20d-407f-4487-b7a4-e70011172529";
    
      //theres a bit of a problem with card data, there are 3 potential price categories, and cards will contain 1 or 2 of those categories, we need to figure out which categories the current card has, and then save all of the card data we need to a new row in our table
    const result = await axios.get(urlToFetch);
    const firstPriceType = Object.keys(result.data.data.tcgplayer.prices)[0];
    const secondPriceType = Object.keys(result.data.data.tcgplayer.prices)[1];
    const firstType = Object.keys(result.data.data.types)[0];

    //this card has two prices
    if (secondPriceType) {
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
      //build the connecter between this card and the user
      let newConnecter = await Connecter.create({
        grade: req.body.grade,
        pokemonId: createPokemon.id,
        userId: req.session.user.id,
      });
      res.json(newConnecter);
    } else {
      //this card only has one price
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
      // build the connecter between this card and the user
      let newConnecter = await Connecter.create({
        grade: req.body.grade,
        pokemonId: createPokemon.id,
        userId: req.session.user.id,
      });
      res.json(newConnecter);
    }
  }
});

module.exports = router;
