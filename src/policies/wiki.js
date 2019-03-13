const ApplicationPolicy = require("./application");

module.exports = class TopicPolicy extends ApplicationPolicy {

  new() {
    return (this._isAdmin() || this._isPremium() || this._isStandard());
  }

  create() {
    return this.new();
  }

  edit() {
    return (this._isAdmin() || this._isPremium() || this._isStandard());
  }

  update() {
    return (this._isAdmin() || this._isPremium());
  }

  destroy() {
    return this.update();
  }
}
