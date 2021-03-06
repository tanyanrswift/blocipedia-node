const express = require("express");
const router = express.Router();

const wikiController = require("../controllers/wikiController");
const Wiki = require("../../src/db/models").Wiki;
const validation = require("./validation")
const User = require("../../src/db/models").User;
const Collaborator = require("../../src/db/models").Collaborator;

router.get("/wikis", wikiController.index);
router.get("/wikis/new", wikiController.new);
router.get("/wikis/:id", wikiController.show);
router.post("/wikis/create", wikiController.create);
router.get("/wikis/:id/edit", wikiController.edit);
router.post("/wikis/:id/destroy", wikiController.destroy);
router.post("/wikis/:id/update", wikiController.update);

module.exports = router;
