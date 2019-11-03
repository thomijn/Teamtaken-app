const router = require("express").Router();
const UserController = require("../controllers/users")
const { ensureAuthenticated } = require('../middleware/verify')
const checkCaptain = require("../middleware/roleCheck")
const checkAdmin = require("../middleware/checkAdmin")

//my profile
router.get("/my-profile", [ensureAuthenticated, checkCaptain], UserController.my_profile)

//edit profile
router.post("/edit-my-profile", [ensureAuthenticated, checkCaptain], UserController.edit_my_profile)

//edit role for admin
router.post("/edit", [ensureAuthenticated, checkAdmin], UserController.edit_user)

module.exports = router;
