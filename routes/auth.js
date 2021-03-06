const express = require('express');
const passport = require('passport');

const router = express.Router();


router.get('/google', passport.authenticate('google', {scope: ['profile','email']}))

router.get('/login', async function (req, res) {
    res.render('login')
});

router.get('/google/login', async function (req, res) {
    res.send('LOGIN')
});

router.get('/google/redirect', async function (req, res) {
    console.log(req.query.code);
    res.redirect('/')
});

router.get('/google/callback', async function (req, res) {
    passport.authenticate('google', { failureRedirect: '/login'}),
    function (req, res) {
        console.log(req.query.code);
        res.redirect('/')
    }
});

router.get('/logout', async function (req, res) {
    res.send('LOGOUT')
});

module.exports = router;