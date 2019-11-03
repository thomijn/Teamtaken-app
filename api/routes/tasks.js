const router = require("express").Router();
const TaskController = require("../controllers/tasks")
const { ensureAuthenticated } = require('../middleware/verify')
const checkCaptain = require("../middleware/roleCheck")

//add task page
router.get('/add-a-task', [ensureAuthenticated, checkCaptain], TaskController.add_a_task_GET)

//add task
router.post('/add-a-task', [ensureAuthenticated, checkCaptain], TaskController.add_a_task)

//edit task done
router.post('/edit-done', [ensureAuthenticated, checkCaptain], TaskController.edit_done_task)

//edit task
router.get('/edit-task/:_id', [ensureAuthenticated, checkCaptain], TaskController.edit_a_task_GET)

//delete task
router.post("/delete", [ensureAuthenticated, checkCaptain], TaskController.delete_a_task)

module.exports = router;