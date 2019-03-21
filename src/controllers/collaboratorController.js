const collaboratorQueries = require("../db/queries.collaborators.js");

module.exports = {
  create(req, res, next){
    let newCollaborator = {
      username: req.body.username,
      role: req.body.role,
      wikiId: req.wiki.id,
      userId: req.user.id
    };

    collaboratorQueries.createCollaborator(newCollaborator, (err, collaborator) => {
      if(err){
        req.flash("error", err);
      }
      res.redirect(req.headers.referer);
    });
  },
  destroy(req, res, next){
    collaboratorQueries.destroyCollaborator(req, (err, collaborator) => {
      if(err){
        req.flash("error", err);
        res.redirect(err, req.headers.referer);
      } else {
        res.redirect(req.headers.referer);
      }
    });
  }
}
