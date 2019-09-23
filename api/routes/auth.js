const router = require("express").Router();
const AuthController = require("../controllers/auth")

router.get("/register", (req, res) => {
    res.render("register")
})

//registration
router.post("/register", AuthController.register_a_user )

//login
router.post("/login", AuthController.login_a_user )

module.exports = router;
