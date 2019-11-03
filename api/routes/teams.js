const router = require("express").Router();
const TeamController = require("../controllers/teams")
const { ensureAuthenticated } = require('../middleware/verify')
const checkCaptain = require("../middleware/roleCheck")
const checkAdmin = require("../middleware/checkAdmin")


// all teams for admin
router.get("/", [ensureAuthenticated, checkAdmin], TeamController.team)

// user team
router.get("/team", [ensureAuthenticated, checkCaptain], TeamController.my_team)

//get specific team
router.get("/:_id", [ensureAuthenticated, checkCaptain, checkAdmin], TeamController.get_a_team)

// add team
router.post("/add", [ensureAuthenticated, checkCaptain], TeamController.add_a_team)

// add user to a team
router.post("/add/user", [ensureAuthenticated, checkCaptain], TeamController.add_user_to_a_team)

// delete user from team
router.post("/delete/user", [ensureAuthenticated, checkCaptain], TeamController.delete_user_from_team)

// change users team
router.post("/change/user", [ensureAuthenticated, checkCaptain], TeamController.change_users_team)

module.exports = router;
