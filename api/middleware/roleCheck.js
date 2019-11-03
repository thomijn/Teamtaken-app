const User = require('../models/User');

module.exports = checkCaptain = (req, res, next) => {
    User.findById(req.session.passport.user)
        .then(user => {
            if (user.role === "team-captain" || user.role === "admin") {
                res.locals.captain = true
                next()
            } else {
                res.locals.captain = false
                next()
            }
        }).catch(err => console.log(err));
}

