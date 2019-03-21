const Collaborator = require("./models").Collaborator;
const Wiki = require("./models").Wiki;
const User = require("./models").User;

module.exports = {
  createCollaborator(newCollaborator, callback){
    return Collaborator.create(newCollaborator)
    .then((collaborator) => {
      callback(null, collaborator);
    })
    .catch((err) => {
      callback(err);
    });
  },
  destroyCollaborator(req, callback){
    return Collaborator.findbyId(req.params.id)
    .then((collaborator) => {
      collaborator.destroy();
      callback(null, collaborator);
    })
  }
}
