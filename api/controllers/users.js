const User = require("../models/User");
const bcrypt = require("bcryptjs")

exports.my_profile = (req, res) => {
  User.findById(req.session.passport.user)
    .then((user) => {
      res.render('my-profile', {
        teamCaptain: res.locals.captain,
        user: user,
        errors: req.session.errors
      })
    })
    .catch((err) => {
      req.flash(
        'error_msg',
        'Oeps er is iets verkeerd gegaan'
      );
      res.status(400).redirect('/home')
    })
}

exports.edit_my_profile = (req, res) => {
  if (!req.body.oldPassword) {

    const { firstname, lastname, email } = req.body;
    let errors = [];

    if (!firstname || !lastname || !email) {
      errors.push({ msg: 'Niet alle velden zijn ingevuld' });
    }

    if (errors.length > 0) {
      req.session.errors = errors;
      res.redirect('/users/my-profile');
    } else {
      User.findByIdAndUpdate(req.session.passport.user, {
        email: email,
        firstname: firstname,
        lastname: lastname,
      })
        .then((user) => {
          req.flash(
            'success_msg',
            'Je gegevens zijn aangepast'
          );
          res.redirect('/users/my-profile')
        })
        .catch((err) => {
          req.flash(
            'error_msg',
            'Oeps er is iets verkeerd gegaan'
          );
          res.status(400).redirect('/home')
        })
    }
  } else {
    const { oldPassword, newPassword2, newPassword } = req.body;
    let errors = [];

    if (!oldPassword || !newPassword || !newPassword2) {
      errors.push({ msg: 'Niet alle velden zijn ingevuld' });
    }

    if (newPassword !== newPassword2) {
      errors.push({ msg: "Wachtwoorden zijn niet gelijk!" })
    }

    if (errors.length > 0) {
      req.session.errors = errors;
      res.redirect('/users/my-profile');
    } else {
      User.findById(req.session.passport.user)
        .then(user => {
          bcrypt.compare(req.body.oldPassword, user.password, (err, isMatch) => {
            if (err) throw err;
            if (isMatch) {
              bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(req.body.newPassword, salt, (err, hash) => {
                  if (err) throw err;
                  newPassword = hash;
                  User.findByIdAndUpdate(req.session.passport.user, {
                    email: req.body.email,
                    firstname: req.body.firstname,
                    lastname: req.body.lastname,
                    password: newPassword
                  })
                    .then((user) => {
                      req.flash(
                        'success_msg',
                        'Je gegevens zijn aangepast'
                      );
                      res.redirect('/users/my-profile')
                    })
                    .catch((err) => {
                      req.flash(
                        'error_msg',
                        'Oeps er is iets verkeerd gegaan'
                      );
                      res.status(400).redirect('/home')
                    })
                });
              });
            }
            else {
              req.flash(
                'error_msg',
                'Onjuist wachtwoord'
              );
              res.redirect('/users/my-profile')
            }

          })
        });
    }
  }
}

exports.edit_user = (req, res) => {
  User.findByIdAndUpdate(req.body.userId, { role: req.body.role })
    .then((user) => {
      req.flash(
        'success_msg',
        'Zijn rol is aangepast'
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