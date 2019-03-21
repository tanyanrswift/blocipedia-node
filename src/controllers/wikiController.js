const wikiQueries = require("../db/queries.wikis.js");
const Authorizer = require("../policies/wiki");
const Sequelize = require("sequelize");
const Op = Sequelize.Op;

module.exports = {
  index(req, res, next){
    console.log("wikiController#index Called Successfully!\n\n");
    console.log(req.user);
    const authorized = new Authorizer(req.user).show();
    let currentUser = {
      username: req.body.username,
      email: req.body.email,
      password: req.body.password,
      role: req.user.role,
      id: req.user.id
    }
    if(authorized && currentUser.role == 'standard'){
      console.log("Found Standard User!\n\n");
      wikiQueries.getAllWikis({private: false}, (err, wikis) => {
        if(err){
          console.log(err)
          res.redirect(500, "static/index");
        } else {
          console.log('standard wikis')
          res.render("wikis/index", {wikis});
        }
      })
    }
    else if(authorized && (currentUser.role == 'premium' || currentUser.role == 'admin')){
      console.log("Found Premium User, or Admin User!\n\n")
      wikiQueries.getAllWikis({
        [Op.or]: [{private: true, userId: currentUser.id}, {private: false}]}, (err, wikis) => {
        //SELECT all wikis IF (private=true AND wiki userId=currentUser.id) OR private=false
        if(err){
          console.log(err)
          res.redirect(500, "static/index");
        } else {
          console.log('premium wikis')
          res.render("wikis/index", {wikis});
        }
      })
    }
    else {
      console.log("ERROR: User Not Authorized!\n\n");
      console.log(authorized)
      console.log(currentUser.role)
      wikiQueries.getAllWikis({private: false}, (err, wikis) => {
        if(err){
          console.log(err)
          res.redirect(500, "static/index");
        } else {
          console.log('not logged in wikis')
          res.render("wikis/index", {wikis});
        }
      })
    }
  },
  new(req, res, next){
    const authorized = new Authorizer(req.user).new();

    if(authorized) {
      res.render("wikis/new");
    } else {
      req.flash("notice", "You are not authorized to do that.");
      res.redirect("/wikis");
    }
  },
  create(req, res, next){

    const authorized = new Authorizer(req.user).create();

    if(authorized) {
      if(!req.body.private){
        req.body.private = false;
      }
      let newWiki = {
        title: req.body.title,
        body: req.body.body,
        userId: req.user.id,
        private: req.body.private
      };
      wikiQueries.addWiki(newWiki, (err, wiki) => {
        if(err){
          req.flash("notice", "Failed to create a new Wiki. Try again.");
          res.redirect(500, "/wikis/new");
          console.log("newWiki:failed");
        } else {
          req.flash("notice", "Wiki created successfully.");
          res.redirect(303, `/wikis/${wiki.id}`);
          console.log(newWiki);
        }
      });
    } else {
      req.flash("notice", "You are not authorized to do that.");
      res.redirect("/wikis");
    }

  },
  show(req, res, next){
    wikiQueries.getWiki(req.params.id, (err, wiki) => {
      if(err || wiki == null){
        res.redirect(404, "/");
      } else {
        console.log(wiki)
        res.render("wikis/show", {wiki});
      }
    });
  },
  destroy(req, res, next){
    wikiQueries.deleteWiki(req, (err, wiki) => {
      if(err){
        res.redirect(500, `/wikis/${req.params.id}`)
      } else {
        res.redirect(303, "/wikis")
      }
    });
  },
  edit(req, res, next){
    wikiQueries.getWiki(req.params.id, (err, wiki) => {
      if(err || wiki == null){
        res.redirect(404, "/");
      } else {
        const authorized = new Authorizer(req.user, wiki).edit();
        if(authorized){
          res.render("wikis/edit", {wiki});
        } else {
          req.flash("You are not authorized to do that.")
          res.redirect(`/wikis/${req.params.id}`)
        }
      }
    });
  },
  update(req, res, next){
    wikiQueries.updateWiki(req, req.body, (err, wiki) => {
      if(err || wiki == null){
        res.redirect(401, `/wikis/${req.params.id}/edit`);
      } else {
        console.log(wiki)
        req.flash("Wiki updated successfully!")
        res.redirect(`/wikis/${req.params.id}`);
      }
    });
  }/*,
  downgrade(req, res, next){
    wikiQueries.downgradeWikis(req, id, (err, user) => {
      if(err){
        console.log('err', err)
        req.flash("error", err);
      } else {
        console.log('Wikis Downgraded')
      }
    });
  }*/
}
