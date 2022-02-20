require("dotenv").config();
const express = require("express");
const app = express();
const PORT = process.env.PORT || 3001;
const session = require("express-session");
const res = require("express/lib/response");
const passport = require("passport");
const strats = require("../strategies/strats");
// Routhing
app.get("/", (req, res) => {
  res.send("hello");
});

app.get("/auth/redirect", (req, res) => {
  passport.authenticate(
    "discord",
    {
      failureRedirect: "/auth/forbidden",
    },
    (err, usr, msg) => {
      console.log("BRUH?");
      //   res.send([msg, err, usr]);
      console.log(msg);
      res.redirect(
        `http://hackdex.tech/login/${Buffer.from(JSON.stringify(msg)).toString(
          "base64"
        )}`
      );
    }
  )(req, res, () => {});
  //   console.log("HELLO???");
});

app.get("/e", (req, res) => {});

app.get("/auth", passport.authenticate("discord"));

app.use(
  session({
    secret: "some random secret",
    cookie: {
      maxAge: 60000 * 60 * 24,
    },
    saveUninitialized: false,
  })
);
app.use(passport.initialize());
app.use(passport.session());

app.listen(PORT, () => {
  console.log(`Now listening to requests on port ${PORT}`);
});
