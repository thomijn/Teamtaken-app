const router = require("express").Router();

// User Model
const User = require("../models/User");

//get users
router.get('/', (req, res) => {
  User.find()
    .then(users => res.json(users));
});

//get specific user
router.get('/:id', (req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(404).json({ msg: "not found" }))
})

//delete user
router.delete("/:id", (req, res) => {
  User.findById(req.params.id)
    .then(user => user.remove()
      .then(() => res.json({ msg: "user removed" })))
    .catch(err => res.status(404).json({ msg: "not found" }));
})

module.exports = router;
