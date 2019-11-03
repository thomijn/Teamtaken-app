const router = require("express").Router();
const AuthController = require("../controllers/auth")

//registration page
router.get("/register", AuthController.register_a_user_GET)

//registration
router.post("/register", AuthController.register_a_user)

//login
router.post("/login", AuthController.login_a_user)

//logout
router.get("/logout", AuthController.logout_a_user)

module.exports = router;
