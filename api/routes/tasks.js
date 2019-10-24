const router = require("express").Router();
const TaskController = require("../controllers/tasks")
const { ensureAuthenticated } = require('../middleware/verify')
const checkCaptain = require("../middleware/roleCheck")

//get all tasks
router.get('/', TaskController.get_all_task);

//add task page
router.get('/add-a-task', [ensureAuthenticated, checkCaptain], (req, res) => {
    User.findById(req.session.passport.user)
        .then((user) => {
            Team.findById(user.team).populate('members')
                .then((team) => {
                    res.render("add-a-task", {
                        teamCaptain: res.locals.captain,
                        team: team
                    })
                })
        })
        .catch(err => {
            req.flash(
                'error_msg',
                'Oops, Something went wrong :('
            );
            res.redirect('/home');
        })
})

//get specific task
router.get('/:_id', TaskController.get_a_task)

//add task
router.post('/add-a-task', TaskController.add_a_task)

//edit task

//delete task
router.delete("/:_id", TaskController.delete_a_task)

module.exports = router;