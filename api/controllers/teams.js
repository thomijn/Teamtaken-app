const Team = require("../models/Team");

exports.get_a_team = async (req, res) => {
    try {
        const team = await Team.findById(req.params._id).populate('members')
        res.send(team)
    }
    catch (err) {
        res.status(400).send(err)
    }
}

exports.add_a_team = async (req, res) => {
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

}

exports.add_user_to_a_team = async (req, res) => {
    try {
        await Team.update({ name: req.body.name }, { $push: { members: req.body._id } })
        res.json({ msg: "User succesfully added to a team" })
    }
    catch (err) {
        res.status(400).send(err)
    }
}