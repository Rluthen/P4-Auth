const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
let users = require('../data/users.json')


passport.use(
    new GoogleStrategy({
        clientID: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET,
        callbackURL: 'http://localhost:3000/auth/google/callback',
    }, function (accessToken, refreshToken, profile, done) {
        console.log('working');
        return done(null,profile);
        // passport callback function
        //check if user already exists in our db with the given profile ID
        
    })
);

passport.serializeUser(function (user, done) {
    done(null, user.id)
});

passport.deserializeUser(function (id, done) {
    const user = users.find(element => element.id = id);
    if(user) done(null, user)
})