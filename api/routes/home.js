const router = require("express").Router();
const { ensureAuthenticated } = require('../middleware/verify')
const checkCaptain = require("../middleware/roleCheck")
const User = require("../models/User");
const Team = require("../models/Team");

router.get("/", [ensureAuthenticated, checkCaptain], async (req, res) => {
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
                        res.render("home", {
                            team: team,
                            user: user,
                            admin: false,
                            teamCaptain: res.locals.captain
                        })
                    })
            }
        })
        .catch((err) => res.status(400))
})

module.exports = router;