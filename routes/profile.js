const express = require('express');
const passport = require('passport');
const router = express.Router();


router.get('/', async function (req, res) {
    if(!req.user) res.redirect('/auth/google/login')
    console.log(req.user);
    res.render('profile',req.user);
});


module.exports = router;