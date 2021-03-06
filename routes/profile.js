const express = require('express');
const passport = require('passport');
const router = express.Router();


router.get('/', async function (req, res) {
    if(!req.user) res.redirect('/auth/login')
    console.log(req.user);
    const profile = req.user;
    res.render('profile');
});


module.exports = router;