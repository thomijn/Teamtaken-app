const Task = require("../models/Task");
var moment = require('moment');
moment.locale('nl')

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

exports.add_a_task = (req, res) => {
    const done = req.body.done === "on" ? true : false
    const date = moment(req.body.date).format('MMMM Do YYYY, h:mm:ss a');
    const newTask = new Task({
        team: req.body.team,
        title: req.body.title,
        date: date,
        executors: req.body.executors,
        done: done
    });
    newTask.save()
        .then(task => {
            req.flash(
                'success_msg',
                'Succesfully added a task'
            );
            res.redirect('/tasks/add-a-task');
        })
        .catch(err => {
            req.flash(
                'error_msg',
                'Oops, Something went wrong :('
            );
            res.redirect('/tasks/add-a-task');
        })
}

exports.edit_done_task = (req, res) => {
    console.log(req.body)
    Task.findByIdAndUpdate(req.body._id, { done: req.body.done })
        .then(() => {
            res.redirect('/teams/team')
        })
        .catch(err => {
            req.flash(
                'error_msg',
                'Oops, Something went wrong :('
            );
            res.redirect('/teams/team');
        })
}

