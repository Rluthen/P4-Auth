const express = require('express');
const passport = require('passport');
let users = require('../data/users.json')
const fs = require('fs')
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

router.get('/google/callback', 
    passport.authenticate('google', { failureRedirect: '/login'}),
    function (req, res) {
        const profile = req.user
        const currentUser = users.find(element => element.googleId = profile.googleId);
        if (currentUser) {
            //if we already have a record with the given profile ID
            res.set('user',currentUser)
            res.redirect('/profile');
        } else {
            //if not, create a new user 
            const newUser = {
                id: users.length + 1,
                googleId: profile.id,
                timestamp: new Date(),
                email: profile.emails[0].value,
                photo: profile.photos[0].value
            };
            users.push(newUser);
            fs.writeFile('../P4-Auth/data/users.json', JSON.stringify(users), function(err, data) {
                if(err) {
                    return console.log(err);
                }
            });
            res.set('user',newUser)
            res.redirect('/profile');

        }
    }
);

router.get('/logout',  (req, res) => {
    req.session = null;
    // algo en express rompio req.logut() por lo que pude ver, asi que directamente se asgina null a user
    req.user = null;
    res.redirect('/')
});

module.exports = router;