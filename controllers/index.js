const router = require("express").Router();
const User = require("../models/User");
const axios = require("axios");

router.get("/", (req, res) => {
  res.render("homepage", { isLoggedIn: req.session.user ? true : false });
});

router.get("/dashboard", (req, res) => {
  res.render("dashboard", { isLoggedIn: req.session.user ? true : false });
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
    if (foundUser.password === req.body.password) {
      req.session.user = {
        userName: foundUser.userName,
        email: foundUser.email,
      };
      return res.json(foundUser);
    }
  });
});
router.post("/signup", (req, res) => {
  User.create({
    userName: req.body.userName,
    email: req.body.email,
    password: req.body.password,
  })
    .then((newUser) => {
      req.session.user = {
        userName: newUser.userName,
        email: newUser.email,
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
  res.render("graph");
});

router.get("/search", (req, res) => {
  res.render("search");
});

// search by type: https://api.pokemontcg.io/v2/cards?q=types:"${type}"

//search by rarity: https://api.pokemontcg.io/v2/cards?q=rarity:"${rarity}"

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
      res.render("layouts/displaysearchresults", {
        cards: allData,
      });
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;
