const collaboratorQueries = require("../db/queries.collaborators.js");
const wikiQueries = require("../db/queries.wikis.js");

module.exports = {
  new(req, res, next){
    let wiki = {
      title: req.body.title,
      body: req.body.body,
      userId: req.user.id,
      private: req.body.private
    };
    res.render("collaborators/new", {wikiId: req.params.wikiId});
  },
  create(req, res, next){
    console.log("collaboratorController Create Called Successfully")
    let newCollaborator = {
      username: req.body.username,
      role: req.body.role,
      wikiId: req.params.postId,
      userId: req.user.id
    };
    collaboratorQueries.createCollaborator(newCollaborator, (err, collaborator) => {
      if(err){
        req.flash("error", err);
      }
      console.log("success")
      res.redirect(req.headers.referer);
    });
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
