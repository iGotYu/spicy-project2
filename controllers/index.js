const router = require('express').Router();
const User = require('../models/User');

router.get("/", (req, res) => {
    res.render("homepage");
})

router.get("/dashboard", (req, res) => {
    res.render("dashboard");
})
router.post("/login", (req, res) => {

})
router.post("/signup", (req, res) => {

})
router.get("/chart", (req, res)=>{
    res.render('graph');
})

module.exports = router;
