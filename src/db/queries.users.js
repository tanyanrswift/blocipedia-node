const User = require("./models").User;
const Wiki = require("./models").Wiki;
const bcrypt = require("bcryptjs");
const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = {
  createUser(newUser, callback){

    const salt = bcrypt.genSaltSync();
    const hashedPassword = bcrypt.hashSync(newUser.password, salt);

    return User.create({
      username: newUser.username,
      email: newUser.email,
      password: hashedPassword
    })
    .then((user) => {
      const msg = {
        to: newUser.email,
        from: 'test@example.com',
        subject: 'Confirming your Blocipedia Sign Up',
        text: 'This is a confirmation email of your sign up with Blocipedia.',
        html: '<strong>This is a confirmation email of your sign up with Blocipedia.</strong>',
      };
      sgMail.send(msg);
      callback(null, user);
    })
    .catch((err) => {
      callback(err);
    })
  },
  upgradeUser(req, callback){
    return User.findById(req.user.id)
    .then((user) => {
      console.log('upgradeUser')
      if(!user){
        callback ("User doesn't exist");
      } else {
        user.update({role: "premium"});
        callback(null, user);
      }
    })
    .catch((err) => {
      callback(err);
    })
  },
  downgradeUser(req, callback){
    return User.findById(req.user.id)
    .then((user) => {
      console.log('downgradeUser')
      if(!user){
        return callback ("User doesn't exist");
      } else {
        user.update({role: "standard"});
        callback(null, user);
      }
    })
    .catch((err) => {
      callback(err);
    })
  },
  downgradeWikis(req, id){
    return Wiki.all()
    .then((wikis) => {
      wikis.forEach((wiki) => {
        if(wiki.userId == id && wiki.private == true){
          wiki.update({
            private: false
          })
        }
      })
    })
    .catch((err) => {
      callback(err);
    })
  }
 };
