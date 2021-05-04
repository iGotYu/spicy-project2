const router = require('express').Router();
const User = require('../models/User');
const bcrypt = require('bcrypt');

router.get("/", (req, res) => {
    res.render("homepage", { isLoggedIn: req.session.user? true: false});
})

router.get("/dashboard", (req, res) => {
    res.render("dashboard", { isLoggedIn: req.session.user? true: false, userName: req.session.user.userName})
})
router.post("/login", (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    }).then(foundUser => {
        if(!foundUser) {
            req.session.destroy();
            return res.status(401).send("Login Failed");
        }
        if(bcrypt.compareSync(req.body.password, foundUser.password)) {
            req.session.user = {
                userName:foundUser.userName,
                email:foundUser.email
            };
            return res.json(foundUser);
        }
    })
})
router.post("/signup", (req, res) => {
    User.create({
        userName: req.body.userName,
        email: req.body.email,
        password: req.body.password
    }).then(newUser =>{
        req.session.user = {
            userName: newUser.userName,
            email: newUser.email
        };
        res.json(newUser);
    }).catch(err =>{
        console.log(err);
        res.status(500).json(err);
    })
})

router.get('/logout', (req, res) => {
    req.session.destroy();
    res.render("homepage");
})
router.get("/chart", (req, res)=>{
    res.render('graph');
})

module.exports = router;
