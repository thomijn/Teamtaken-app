const Team = require("../models/Team");
const User = require("../models/User");
const Task = require("../models/Task");
var moment = require('moment');

exports.team = async (req, res) => {
    try {
        await Team.find()
            .then(teams => {
                res.render("teams", {
                    teams: teams,
                })
            })
    }
    catch (err) {
        res.status(400).send("Oeps er is iets verkeerd gegaan")
    }
}

exports.get_a_team = async (req, res) => {
    try {
        await Team.findById(req.params._id).populate('members')
            .then((team) => {
                Task.find({ team: req.params._id }).populate('executors').then(async (tasks) => {
                    const teams = await Team.find()
                    const user = await User.findById(req.session.passport.user)
                    res.render("teams-detail", {
                        user: user,
                        team: team,
                        teams: teams,
                        tasks: tasks,
                        teamCaptain: res.locals.captain
                    })
                })
            })
    }
    catch (err) {
        req.flash(
            'error_msg',
            'Oeps er is iets verkeerd gegaan'
        );
        res.status(400).redirect('/teams')
    }
}

exports.add_a_team = (req, res) => {

    Team.findOne({ name: req.body.name }).then((team) => {
        if (team) {
            req.flash(
                'error_msg',
                'Team already exists'
            );
            res.redirect('/teams');
        } else {
            const team = new Team({
                name: req.body.name,
            });
            try {
                team.save()
                    .then(() => {
                        req.flash(
                            'success_msg',
                            'Successfully added a team!'
                        );
                        res.redirect('/teams');
                    })
            }
            catch (err) {
                res.status(400).send(err)
            }
        }
    })
}

exports.add_user_to_a_team = async (req, res) => {
    try {
        await Team.updateOne({ _id: req.body._id }, { $push: { members: req.body.userId } })
        await User.updateOne({ _id: req.body.userId }, { team: req.body._id })
            .then(() => {
                req.flash(
                    'success_msg',
                    'User succesfully added to a team'
                );
                res.redirect('/home')
            })
            .catch((err) => {
                req.flash(
                    'error_msg',
                    'Oeps er is iets verkeerd gegaan'
                );
                res.status(400).redirect('/home')
            })
    }
    catch (err) {
        req.flash(
            'error_msg',
            'Oeps er is iets verkeerd gegaan'
        );
        res.status(400).redirect('/home')
    }
}

exports.my_team = async (req, res) => {
    try {
        await User.findById(req.session.passport.user)
            .then(async user => {
                let b = moment();
                const daysUser = b.diff(moment(user.created), 'days') >= 10 ? true : false
                const team = await Team.findById(user.team).populate('members')
                if (req.query.search || req.query.done || req.query.members) {
                    const regex = new RegExp(escapeRegex(req.query.search), 'gi');
                    if (req.query.members !== "" && req.query.done !== "") {
                        const tasks = await Task.find({ team: user.team, title: regex, executors: { $all: [req.query.members] }, done: req.query.done === "true" ? true : false }).populate('executors').sort({ date: 1 })
                        res.render('my-team', {
                            user: user,
                            team: team,
                            tasks: tasks,
                            teamCaptain: res.locals.captain,
                            oldUser: daysUser
                        })
                    } else if (req.query.done && req.query.members === "") {
                        const tasks = await Task.find({ team: user.team, title: regex, done: req.query.done === "true" ? true : false }).populate('executors').sort({ date: 1 })
                        res.render('my-team', {
                            user: user,
                            team: team,
                            tasks: tasks,
                            teamCaptain: res.locals.captain,
                            oldUser: daysUser
                        })
                    } else if (req.query.members && req.query.done === "") {
                        const tasks = await Task.find({ team: user.team, title: regex, executors: { $all: [req.query.members] } }).populate('executors').sort({ date: 1 })
                        res.render('my-team', {
                            user: user,
                            team: team,
                            tasks: tasks,
                            teamCaptain: res.locals.captain,
                            oldUser: daysUser
                        })
                    } else {
                        const tasks = await Task.find({ team: user.team, title: regex }).populate('executors').sort({ date: 1 })
                        res.render('my-team', {
                            user: user,
                            team: team,
                            tasks: tasks,
                            teamCaptain: res.locals.captain,
                            oldUser: daysUser
                        })
                    }
                } else {
                    const tasks = await Task.find({ team: user.team }).populate('executors').sort({ date: 1 })
                    res.render('my-team', {
                        user: user,
                        team: team,
                        tasks: tasks,
                        teamCaptain: res.locals.captain,
                        oldUser: daysUser
                    })
                }
            })
    } catch (err) {
        req.flash(
            'error_msg',
            'Oeps er is iets verkeerd gegaan'
        );
        res.status(400).redirect('/home')
    }
}

exports.delete_user_from_team = async (req, res) => {
    try {
        await User.findById(req.body.userId)
            .then(async user => {
                await User.findOneAndUpdate({ _id: req.body.userId }, { team: null })
                await Team.findByIdAndUpdate(user.team, { $pull: { members: req.body.userId } })
                    .then((team) => {
                        res.redirect(`/teams/${team._id}`)
                    })
            })
    }
    catch (err) {
        req.flash(
            'error_msg',
            'Oeps er is iets verkeerd gegaan'
        );
        res.status(400).redirect('/home')
    }
}

exports.delete_user_from_team = async (req, res) => {
    try {
        await User.findById(req.body.userId)
            .then(async user => {
                await User.findOneAndUpdate({ _id: req.body.userId }, { team: null })
                await Team.findByIdAndUpdate(user.team, { $pull: { members: req.body.userId } })
                    .then((team) => {
                        res.redirect(`/teams/${team._id}`)
                    })
            })
    }
    catch (err) {
        req.flash(
            'error_msg',
            'Oeps er is iets verkeerd gegaan'
        );
        res.status(400).redirect('/home')
    }
}

exports.change_users_team = async (req, res) => {
    try {
        const user = await User.findById(req.body.userId)
        await Team.findByIdAndUpdate(user.team, { $pull: { members: req.body.userId } })
            .then(async () => {
                await User.findByIdAndUpdate(req.body.userId, { team: req.body._id })
                await Team.findByIdAndUpdate(req.body._id, { $push: { members: req.body.userId } })
                    .then(() => {
                        req.flash(
                            'success_msg',
                            'User succesfully transferred'
                        );
                        res.redirect(`/teams/${user.team}`)
                    })
                    .catch((err) => {
                        req.flash(
                            'error_msg',
                            'Oeps er is iets verkeerd gegaan'
                        );
                        res.status(400).redirect(`/teams/${user.team}`)
                    })
            })
    }
    catch (err) {
        req.flash(
            'error_msg',
            'Oeps er is iets verkeerd gegaan'
        );
        res.status(400).redirect(`/teams/${user.team}`)
    }
}

const escapeRegex = (text) => {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
