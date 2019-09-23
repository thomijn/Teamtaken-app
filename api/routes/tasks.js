const router = require("express").Router();
const TaskController = require("../controllers/tasks")

//get all tasks
router.get('/', TaskController.get_all_task );

//get specific task
router.get('/:_id', TaskController.get_a_task )

//add task

//edit task

//delete task
router.delete("/:_id", TaskController.delete_a_task )

module.exports = router;