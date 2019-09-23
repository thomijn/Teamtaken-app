const router = require("express").Router();
const { ensureAuthenticated } = require('../middleware/verify')


router.get("/", ensureAuthenticated, (req, res) => {
    res.render("home")
})

module.exports = router;