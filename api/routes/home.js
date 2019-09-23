const router = require("express").Router();
const verify = require("../middleware/verfiyToken")

router.get("/", (req, res) => {
    res.render("home")
})

module.exports = router;