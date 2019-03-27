const collaboratorQueries = require("../db/queries.collaborators.js");
const wikiQueries = require("../db/queries.wikis.js");

module.exports = {
  add(req, res, next){
    console.log("collaboratorController Add Called Successfully")
    res.render("collaborators/add")
  },
  create(req, res, next){
    console.log("collaboratorController Create Called Successfully")
    let newCollaborator = {
      wikiId: req.params.id,
      userId: req.user.id
    };
    collaboratorQueries.createCollaborator(newCollaborator, req, (err, collaborator) => {
      if(err){
        console.log(err);
        req.flash("error", err);
      }
      console.log("success")
      res.redirect(`/wikis/${req.params.id}`);
    });
  },
  remove(req, res, next){
    console.log("collaboratorController Remove Called Successfully")
    res.render("collaborators/remove")
  },
  destroy(req, res, next){
    console.log("collaboratorController destroy Called Successfully");
    collaboratorQueries.destroyCollaborator(req, (err, collaborator) => {
      if(err){
        req.flash("error", err);
        res.redirect(err, req.headers.referer);
      } else {
        console.log("success")
        res.redirect(req.headers.referer);
      }
    });
  }
}
