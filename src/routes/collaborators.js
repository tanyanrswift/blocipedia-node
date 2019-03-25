const express = require("express");
const router = express.Router();

const collaboratorController = require("../controllers/collaboratorController");
const Collaborator = require("../../src/db/models").Collaborator;
const Wiki = require("../../src/db/models").Wiki;
const validation = require("./validation")
const User = require("../../src/db/models").User;

router.get("/wikis/:id/collaborators/add", collaboratorController.add);
router.get("/wikis/:id/collaborators/remove", collaboratorController.remove);
router.post("/wikis/:id/collaborators/create", collaboratorController.create);
router.post("/wikis/:id/collaborators/destroy", collaboratorController.destroy);

module.exports = router;
