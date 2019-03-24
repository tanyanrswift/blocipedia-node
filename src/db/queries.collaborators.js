const Collaborator = require("./models").Collaborator;
const Wiki = require("./models").Wiki;
const User = require("./models").User;

module.exports = {
  createCollaborator(newCollaborator, req, callback){
    console.log('createCollaborator')
    User.findAll({
      where: {
        id: req.body.collaborator
      }
    })
    .then((users) => {
      Collaborator.findAll({
        where: {
          wikiId: req.params.wikiId,
          userId: req.user.id
        }
      })
      .then((collaborators) => {
        return Collaborator.create(newCollaborator)
        .then((collaborator) => {
          callback(null, collaborator);
        })
        .catch((err) => {
          callback(err);
        })
      })
      .catch((err) => {
        callback(err);
      })
    })
    /*return Collaborator.create(newCollaborator)
    .then((collaborator) => {
      callback(null, collaborator);
    })
    .catch((err) => {
      callback(err);
    });*/
  },
  destroyCollaborator(req, callback){
    console.log('destroyCollaborator')
    Collaborator.destroy({
      where: {
        userId: req.body.collaborator,
        wikiId: req.params.wikiId
      }
    })
    .then((deletedRecordsCount) => {
      callback(null, deletedRecordsCount);
    })
    .catch((err) => {
      callback(err);
    });
    /*return Collaborator.findById(req.params.id)
    .then((collaborator) => {
      collaborator.destroy();
      callback(null, collaborator);
    })*/
  }
}
