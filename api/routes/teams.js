const router = require("express").Router();
const TeamController = require("../controllers/teams")


router.get("/", TeamController.team)

// user team
router.get("/team", TeamController.my_team)

//get specific team
router.get("/:_id", TeamController.get_a_team)


// add team
router.post("/add", TeamController.add_a_team)

// add user to a team
router.post("/add/user", TeamController.add_user_to_a_team)

// delete user from team
router.post("/delete/user", TeamController.delete_user_from_team)

// change users team
router.post("/change/user", TeamController.change_users_team)

module.exports = router;
