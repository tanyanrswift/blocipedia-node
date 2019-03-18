const passport = require("passport");
const userQueries = require("../db/queries.users.js");

const keyPublishable = process.env.PUBLISHABLE_KEY;
var stripe = require("stripe")("sk_test_AKp6Wxv6AE5OVM1laNsiSBMl");

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
    res.render("users/upgrade", {keyPublishable});
    console.log("Upgrade Form Rendered Successfully");
  },
  upgrade(req, res, next){
    console.log("UserController Post Upgrade");
    userQueries.upgradeUser(req, (err, user) => {
      if(err){
        req.flash("error", err);
        res.redirect("/users/upgrade");
      } else {
        console.log('Stripe');
        let amount = 1500;

        stripe.customers.create({
          email: req.body.stripeEmail,
          source: req.body.stripeToken
        })
        .then(customer =>
        stripe.charges.create({
          amount,
          description: "Blocipedia Account Upgrade Charge",
            currency: "usd",
            customer: customer.id
        }))
        .then(charge => res.render("users/upgrade_success"))
      }
    })
  },
  downgradeForm(req, res, next){
    res.render("users/downgrade", {keyPublishable});
    console.log("Downgrade Form Rendered Successfully");
  },
  downgrade(req, res, next){
    console.log("User Controller Post Downgrade")
    userQueries.downgradeUser(req, (err, user) => {
      if(err){
        console.log('err', err)
        req.flash("error", err);
        res.redirect("/users/downgrade");
      } else {
        console.log('Downgrade Success')
        res.render("users/downgrade_success");
      }
    });
  }
}
