const wikiQueries = require("../db/queries.wikis.js");
const Authorizer = require("../policies/wiki");

module.exports = {
  index(req, res, next){
    if(authorized && currentUser.role == 'standard'){
        wikiQueries.getAllWikis({private: false}, (err, wikis) => {
          if(err){
            res.redirect(500, "static/index");
          } else {
            res.render("wikis/index", {wikis});
          }
        })
      }
    if(authorized && (currentUser.role == 'premium' || currentUser.role == 'admin')){
      wikiQueries.getAllWikis({[Op.or]: [{private: true, wiki.userId == userId}, {private: false}]}, (err, wikis) => {
        if(err){
          res.redirect(500, "static/index";
        } else {
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
        let req.body.private = false;
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
        res.redirect(`/wikis/${req.params.id}`);
      }
    });
  }
}
