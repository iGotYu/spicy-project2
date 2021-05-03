const router = require('express').Router();

router.get("/chart", (req, res)=>{
    res.render('graph')
})