const User = require("../models/User");
const Team = require("../models/Team");
const moment = require('moment');
moment.locale('nl')

exports.get_home = async (req, res) => {
    User.findById(req.session.passport.user)
        .then(user => {
            if (user.role === "admin") {
                let newUsers = []
                User.find()
                    .then(users => {
                        users.map((user) => {
                            if (user.team === null && user.role !== "admin") {
                                newUsers.push(user)
                            }
                        })
                        Team.find()
                            .then(teams => {
                                res.render("home", {
                                    admin: true,
                                    newUsers: newUsers,
                                    teams: teams
                                })
                            })
                    })
            } else {
                Team.findById(user.team).populate('members')
                    .then((team) => {
                        Task.find({ team: team._id, executors: { $all: [req.session.passport.user] } }).sort({ date: 1 })
                            .then((tasks) => {
                                if (tasks.length) {
                                    const timeTill = moment(tasks[0].date).fromNow()
                                    res.render("home", {
                                        team: team,
                                        user: user,
                                        admin: false,
                                        task: tasks[0],
                                        teamCaptain: res.locals.captain,
                                        timeTill: timeTill
                                    })
                                } else {
                                    res.render("home", {
                                        team: team,
                                        user: user,
                                        admin: false,
                                        task: tasks[0],
                                        teamCaptain: res.locals.captain,
                                    })
                                }
                            })
                    })
            }
        })
        .catch((err) => res.status(400))
}