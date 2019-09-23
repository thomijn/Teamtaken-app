const User = require("../models/User");

exports.get_all_users = (req, res) => {
    User.find()
      .then(users => res.json(users));
  }

exports.get_a_user = (req, res) => {
    User.findById(req.params.id)
      .then(user => res.json(user))
      .catch(err => res.status(404).json({ msg: "not found" }))
  }

exports.delete_a_user = (req, res) => {
    User.findById(req.params.id)
      .then(user => user.remove()
        .then(() => res.json({ msg: "user removed" })))
      .catch(err => res.status(404).json({ msg: "not found" }));
  }