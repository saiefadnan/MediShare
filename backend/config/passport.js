const GoogleStrategy = require('passport-google-oauth20').Strategy;
require('dotenv').config()
const passport = require('passport');

passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: "https://medishare-production-41a4.up.railway.app/api/user/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
    console.log('Google profile:', profile);
    done(null, profile);
  }
));

passport.serializeUser((user, done)=>{
    done(null, user);
});

passport.deserializeUser((user, done)=>{
    done(null, user);
});