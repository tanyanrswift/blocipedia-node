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
      username: req.body.username,
      role: req.body.role,
      wikiId: req.params.wikiId,
      userId: req.user.id
    };
    collaboratorQueries.createCollaborator(newCollaborator, req, (err, collaborator) => {
      if(err){
        req.flash("error", err);
      }
      console.log("success")
      console.log(req.headers.referer);
      res.redirect(req.headers.referer);
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
