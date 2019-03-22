const express = require("express");
const router = express.Router();

const collaboratorController = require("../controllers/collaboratorController");
const Collaborator = require("../../src/db/models").Collaborator;
const Wiki = require("../../src/db/models").Wiki;
const validation = require("./validation")
const User = require("../../src/db/models").User;

router.get("/wikis/:wikiId/collaborators/new", collaboratorController.new);
router.post("/wikis/:wikiId/collaborators/create", collaboratorController.create);
router.post("/wikis/:wikiId/collaborators/destroy", collaboratorController.destroy);

module.exports = router;
