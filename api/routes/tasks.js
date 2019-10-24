const router = require("express").Router();
const TaskController = require("../controllers/tasks")
const { ensureAuthenticated } = require('../middleware/verify')
const checkCaptain = require("../middleware/roleCheck")

//get all tasks
router.get('/', TaskController.get_all_task);

//add task page
router.get('/add-a-task', [checkCaptain], (req, res) => {
    res.render("add-a-task", {
        teamCaptain: res.locals.captain
    })
})

//get specific task
router.get('/:_id', TaskController.get_a_task)

//add task
router.post('/add-a-task', TaskController.make_a_task)

//edit task

//delete task
router.delete("/:_id", TaskController.delete_a_task)

module.exports = router;