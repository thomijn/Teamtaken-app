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

exports.make_a_task = (req, res) => {
    const newTask = {
        title: req.body.title,
        date: req.body.date,
        team: req.body.team,
        executors: req.body.executors
    }
    Task.save()
        .then(task => {
            req.flash(
                'success_msg',
                'Succesfully added a task'
            );
            res.redirect('/add-a-task');
        })
        .catch(err => {
            req.flash(
                'error_msg',
                'Oops, Something went wrong :('
            );
            res.redirect('/add-a-task');
        })
}