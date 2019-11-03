const User = require('../models/User');

module.exports = checkAdmin = (req, res, next) => {
    User.findById(req.session.passport.user)
        .then(user => {
            if (user.role === "admin") {
                res.locals.captain = true
                next()
            } else {
                res.render("error-admin")
            }
        }).catch(err => console.log(err));
}