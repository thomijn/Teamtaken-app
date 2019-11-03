const router = require("express").Router();
const HomeController = require("../controllers/home")
const { ensureAuthenticated } = require('../middleware/verify')
const checkCaptain = require("../middleware/roleCheck")

//home page
router.get("/", [ensureAuthenticated, checkCaptain], HomeController.get_home)

module.exports = router;