const Task = require("../models/Task");
var moment = require('moment');
moment.locale('nl')

exports.delete_a_task = (req, res) => {
    Task.findByIdAndDelete(req.body.taskId)
        .then(task => {
            req.flash(
                'success_msg',
                'Taak verwijderd'
            );
            if (req.body.userRole === "admin") {
                res.redirect(`/teams/${req.body.teamId}`);
            } else {
                res.redirect('/teams/team');
            }
        })
        .catch(err => {
            req.flash(
                'error_msg',
                ' Oeps er is iets verkeerd gegaan :('
            );
            res.redirect('/tasks/add-a-task');
        })
}

exports.add_a_task = (req, res) => {
    const { title, date, executors } = req.body;
    let errors = [];

    if (!title || !date || !executors) {
        errors.push({ msg: 'Vul alle velden in' });
    }

    if (title.length < 5) {
        errors.push({ msg: 'Titel moet tenminste uit 5 tekens bestaan' });
    }

    if (errors.length > 0) {
        req.session.errors = errors;
        res.redirect('/tasks/add-a-task');
    } else {
        const done = req.body.done === "on" ? true : false
        const newTask = new Task({
            team: req.body.team,
            title: req.body.title,
            date: req.body.date,
            executors: req.body.executors,
            done: done
        });
        newTask.save()
            .then(task => {
                req.flash(
                    'success_msg',
                    'Taak toegevoegd'
                );
                res.redirect('/tasks/add-a-task');
            })
            .catch(err => {
                req.flash(
                    'error_msg',
                    ' Oeps er is iets verkeerd gegaan :('
                );
                res.redirect('/tasks/add-a-task');
            })
    }
}

exports.edit_done_task = (req, res) => {
    Task.findByIdAndUpdate(req.body._id, { done: req.body.done })
        .then(() => {
            res.redirect('/teams/team')
        })
        .catch(err => {
            req.flash(
                'error_msg',
                ' Oeps er is iets verkeerd gegaan :('
            );
            res.redirect('/teams/team');
        })
}

exports.edit_a_task_GET = (req, res) => {
    Task.findById(req.params._id)
        .then(task => {
            Team.findById(task.team).populate("members")
                .then((team) => {
                    res.render('add-a-task', {
                        task: task,
                        edit: true,
                        teamCaptain: res.locals.captain,
                        team: team
                    })
                })
        })
        .catch(err => {
            req.flash(
                'error_msg',
                ' Oeps er is iets verkeerd gegaan :('
            );
            res.redirect('/tasks/add-a-task');
        })
}

exports.edit_a_task = (req, res) => {
    const { title, date, executors } = req.body;
    let errors = [];

    if (!title || !date || !executors) {
        errors.push({ msg: 'Vul alle velden in' });
    }

    if (title.length < 5) {
        errors.push({ msg: 'Titel moet tenminste uit 5 tekens bestaan' });
    }

    if (errors.length > 0) {
        req.session.errors = errors;
        res.redirect('/tasks/add-a-task');
    } else {
        const done = req.body.done === "on" ? true : false
        const date = moment(req.body.date).format('MMMM Do YYYY, h:mm:ss a');
        Task.findByIdAndUpdate(req.query._id, {
            date: date,
            done: done,
            title: req.body.done,
            executors: req.body.executors
        })
            .then(task => {
                req.flash(
                    'success_msg',
                    'Taak gewijzigd'
                );
                res.redirect('/tasks/add-a-task');
            })
            .catch(err => {
                req.flash(
                    'error_msg',
                    ' Oeps er is iets verkeerd gegaan :('
                );
                res.redirect('/tasks/add-a-task');
            })
    }

}

exports.add_a_task_GET = (req, res) => {
    User.findById(req.session.passport.user)
        .then((user) => {
            Team.findById(user.team).populate('members')
                .then((team) => {
                    res.render("add-a-task", {
                        teamCaptain: res.locals.captain,
                        team: team,
                        errors: req.session.errors
                    })
                })
        })
        .catch(err => {
            req.flash(
                'error_msg',
                ' Oeps er is iets verkeerd gegaan :('
            );
            res.redirect('/home');
        })
}