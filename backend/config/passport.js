const passport = require('passport');
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const FacebookStrategy = require('passport-facebook').Strategy;
const User = require('../models/User');

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});


passport.use(new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: "/api/auth/google/callback"
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ googleId: profile.id });

    if (!user) {
      user = await User.findOne({ email: profile.emails[0].value });
      
      if (user) {
        user.googleId = profile.id;
        await user.save();
      } else {
        user = await User.create({
          name: profile.displayName,
          email: profile.emails[0].value,
          googleId: profile.id
        });
      }
    }

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
}));


passport.use(new FacebookStrategy({
  clientID: process.env.FACEBOOK_APP_ID,
  clientSecret: process.env.FACEBOOK_APP_SECRET,
  callbackURL: "/api/auth/facebook/callback",
  profileFields: ['id', 'emails', 'name'],
  scope: ['public_profile', 'email']
},
async (accessToken, refreshToken, profile, done) => {
  try {
    let user = await User.findOne({ facebookId: profile.id });

    if (!user) {
      user = await User.findOne({ email: profile.emails[0].value });
      
      if (user) {
        user.facebookId = profile.id;
        await user.save();
      } else {
        user = await User.create({
          name: `${profile.name.givenName} ${profile.name.familyName}`,
          email: profile.emails[0].value,
          facebookId: profile.id
        });
      }
    }

    return done(null, user);
  } catch (err) {
    return done(err, null);
  }
})); 