const express = require('express');
const passport = require('passport');
const GitHubStrategy = require('passport-github').Strategy;

const app = express();

passport.use(new GitHubStrategy({
  clientID: process.env.GITHUB_CLIENT_ID,
  clientSecret: process.env.GITHUB_CLIENT_SECRET,
  callbackURL: 'https://www.strayd.com/api/auth/callback'
}, (accessToken, refreshToken, profile, done) => {
  done(null, { accessToken, profile });
}));

app.get('/auth', passport.authenticate('github'));
app.get('/auth/callback', passport.authenticate('github', { failureRedirect: '/' }),
  (req, res) => {
    res.json({ token: req.user.accessToken });
  });

module.exports = app;
