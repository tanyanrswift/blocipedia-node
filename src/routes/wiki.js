const express = require("express");
const router = express.Router();
const wikiController = require("../controllers/wikiController");

router.get("/wikis/new", wikiController.new);
router.get("/wikis/create", wikiController.create);

module.exports = router;
