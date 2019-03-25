const Collaborator = require("./models").Collaborator;
const Wiki = require("./models").Wiki;
const User = require("./models").User;

module.exports = {
  createCollaborator(newCollaborator, req, callback){
    console.log('createCollaborator')
    return Collaborator.create({
      username: newCollaborator.username,
      userId: newCollaborator.userId,
      wikiId: newCollaboraotr.wikiId
    })

    .then((collaborator) => {
      callback(null, collaborator);
    })
    .catch((err) => {
      callback(err);
    });
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
  }
}
