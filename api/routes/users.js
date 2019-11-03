const router = require("express").Router();
const UserController = require("../controllers/users")
const { ensureAuthenticated } = require('../middleware/verify')
const checkCaptain = require("../middleware/roleCheck")

//my profile
router.get("/my-profile", [ensureAuthenticated, checkCaptain], UserController.my_profile)

//edit profile
router.post("/edit-my-profile", [ensureAuthenticated, checkCaptain], UserController.edit_my_profile)

module.exports = router;
