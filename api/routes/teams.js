const router = require("express").Router();
const verify = require("../middleware/verfiyToken")

// User Model
const Team = require("../models/Team");

//get specific team
router.get("/:_id", verify, async (req, res) => {
    try {
        const team = await Team.findById(req.params._id).populate('members')
        res.send(team)
    }
    catch (err) {
        res.status(400).send(err)
    }
})

// add team
router.post("/add", async (req, res) => {
    const team = new Team({
        name: req.body.name,
    });

    try {
        await team.save()
        res.json({ msg: "Team succesfully added" })
    }
    catch (err) {
        res.status(400).send(err)
    }

})

// add user to a team
router.put("/add/user", async (req, res) => {
    try {
        await Team.update({ name: req.body.name }, { $push: { members: req.body._id } })
        res.json({ msg: "User succesfully added to a team" })
    }
    catch (err) {
        res.status(400).send(err)
    }
})

module.exports = router;
