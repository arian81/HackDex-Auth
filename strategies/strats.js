const DiscordStrategy = require("passport-discord").Strategy;
const passport = require("passport");
const express = require("express");

passport.use(
  new DiscordStrategy(
    {
      clientID: process.env.CLIENT_ID,
      clientSecret: process.env.CLIENT_SECRET,
      callbackURL: process.env.CLIENT_REDIRECT,
      scope: ["identify"],
    },
    (accessToken, refreshToken, profile, done) => {
      console.log(profile.username);
      console.log(profile.id);
      return done(null, false, profile);
    }
  )
);
