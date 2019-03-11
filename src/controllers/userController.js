const passport = require("passport");
const userQueries = require("../db/queries.users.js");

module.exports = {
  create(req, res, next){
    let newUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      passwordConfirmation: req.body.passwordConfirmation
    };

    userQueries.createUser(newUser, (err, user) => {
      if(err){
        req.flash("error", err);
        console.log(err);
        res.redirect("/users/sign_up");
      } else {
        console.log(user);
        passport.authenticate("local")(req, res, () => {
          req.flash("notice", "You've successfully signed in!");
          res.redirect("/");
          console.log("User created");
        })
      }
    });
  },
  signUp(req, res, next){
    res.render("users/sign_up");
  },
  signInForm(req, res, next){
    res.render("users/sign_in");
  },
  signIn(req, res, next){
    passport.authenticate("local")(req, res, function () {
      if(!req.user){
        req.flash("notice", "Sign in failed. Please try again.")
        res.redirect("/users/sign_in");
      } else {
        req.flash("notice", "You've successfully signed in!");
        res.redirect("/");
      }
    })
  },
  signOut(req, res, next){
    req.logout();
    req.flash("notice", "You've successfully signed out!");
    res.redirect("/");
  }
}
