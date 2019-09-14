const router = require("express").Router();

// Task Model
const Task = require("../models/Task");

//get tasks
router.get('/', (req, res) => {
    Task.find()
        .then(users => res.json(users));
});

//get specific task
router.get('/:_id', (req, res) => {
    Task.findById(req.params._id)
        .then(task => res.json(task))
        .catch(err => res.status(404).json({ msg: "not found" }))
})

//add task

//edit task

//delete task
router.delete("/:_id", (req, res) => {
    Task.findById(req.params._id)
        .then(task => task.remove()
            .then(() => res.json({ msg: "task removed" })))
        .catch(err => res.status(404).json({ msg: "not found" }));
})

module.exports = router;