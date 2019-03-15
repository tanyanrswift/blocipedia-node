const passport = require("passport");
const userQueries = require("../db/queries.users.js");

const keyPublishable = process.env.PUBLISHABLE_KEY;
const keySecret = process.env.SECRET_KEY;
const stripe = require("stripe")(keySecret);

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
        console.log("Sign In Successful");
        req.flash("notice", "You've successfully signed in!");
        res.redirect("/");
      }
    })
  },
  signOut(req, res, next){
    req.logout();
    req.flash("notice", "You've successfully signed out!");
    res.redirect("/");
  },
  upgradeForm(req, res, next){
    res.render("users/upgrade");
  },
  upgrade(req, res, next){
    //code for us to actually upgrade
    var stripe = require("stripe")("sk_test_AKp6Wxv6AE5OVM1laNsiSBMl");

    const token = request.body.stripeToken;

    (async () => {
      const charge = await stripe.charges.create({
        amount: 1500,
        currency: 'usd',
        description: 'Blocipedia Account Upgrade Charge',
        source: token,
      });
    })();
  },
  downgradeForm(req, res, next){
    res.render("users/downgrade");
  },
  downgrade(req, res, next){
    //code for us to actually downgrade
  }
}
