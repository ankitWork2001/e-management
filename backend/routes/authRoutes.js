const express = require("express");
const router = express.Router();
const { signup, login,updateUserProfile } = require("../controllers/authController");
const passport = require('passport');
require("../config/passport");
const jwt = require('jsonwebtoken');
router.post("/signup", signup);
router.post("/login", login);
router.put("/:id", updateUserProfile);
const session = require('express-session');
const app=express();

app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: true,
}))

app.use(passport.initialize());
app.use(passport.session());

router.get('/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

router.get('/google/callback',
  passport.authenticate('google', { failureRedirect: '/login' }),
  (req, res) => {
    
    const payload = {
      user: {
        id: req.user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE },
      (err, token) => {
        if (err) throw err;
       
        res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
      }
    );
  }
);


router.get('/facebook',
  passport.authenticate('facebook', { scope: ['public_profile', 'email'] })
);

router.get('/facebook/callback',
  passport.authenticate('facebook', { failureRedirect: '/login' }),
  (req, res) => {
   
    const payload = {
      user: {
        id: req.user.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRE },
      (err, token) => {
        if (err) throw err;
        
        res.redirect(`${process.env.FRONTEND_URL}/auth/callback?token=${token}`);
      }
    );
  }
);
module.exports = router;
