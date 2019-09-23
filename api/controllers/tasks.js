const Task = require("../models/Task");

exports.get_all_task = (req, res) => {
    Task.find()
        .then(users => res.json(users));
}

exports.get_a_task = (req, res) => {
    Task.findById(req.params._id)
        .then(task => res.json(task))
        .catch(err => res.status(404).json({ msg: "not found" }))
}

exports.delete_a_task = (req, res) => {
    Task.findById(req.params._id)
        .then(task => task.remove()
            .then(() => res.json({ msg: "task removed" })))
        .catch(err => res.status(404).json({ msg: "not found" }));
}