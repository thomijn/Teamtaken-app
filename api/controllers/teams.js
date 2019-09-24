const Team = require("../models/Team");
const User = require("../models/User");


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
        await Team.updateOne({ name: req.body.name }, { $push: { members: req.body.userId } })
        const team = await Team.findOne({ name: req.body.name })
        console.log(team)
        await User.updateOne({ _id: req.body.userId }, {team: team._id})
        req.flash(
            'success_msg',
            'User succesfully added to a team'
        );
        res.redirect('/home')
    }
    catch (err) {
        res.status(400).send(err)
    }
}