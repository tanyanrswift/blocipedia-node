const passport = require("passport");

module.exports = {
  index(req, res, next){
    res.send("TODO: list all users");
  },
  signUp(req, res, next){
    res.render("users/sign_up");
  }
}
