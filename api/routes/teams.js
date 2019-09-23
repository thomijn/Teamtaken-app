const router = require("express").Router();
const verify = require("../middleware/verfiyToken")
const TeamController = require("../controllers/teams")

//get specific team
router.get("/:_id", verify, TeamController.get_a_team )

// add team
router.post("/add", verify, TeamController.add_a_team )

// add user to a team
router.put("/add/user", verify, TeamController.add_user_to_a_team )

module.exports = router;
