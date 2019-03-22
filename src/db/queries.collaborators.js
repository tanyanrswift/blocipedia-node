const Collaborator = require("./models").Collaborator;
const Wiki = require("./models").Wiki;
const User = require("./models").User;

module.exports = {
  createCollaborator(newCollaborator, callback){
    console.log('createCollaborator')
    return Collaborator.create(newCollaborator)
    .then((collaborator) => {
      callback(null, collaborator);
    })
    .catch((err) => {
      callback(err);
    });
  },
  destroyCollaborator(req, callback){
    console.log('destroyCollaborator')
    console.log("COLLABORATOR ID:", req.params.id)
    return Collaborator.findById(req.params.id)
    .then((collaborator) => {
      collaborator.destroy();
      callback(null, collaborator);
    })
  }
}
