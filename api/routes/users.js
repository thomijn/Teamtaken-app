const router = require("express").Router();
const UserController = require("../controllers/users")
const verify = require("../middleware/verfiyToken")

//get users
router.get('/', verify, UserController.get_all_users );

//get specific user
router.get('/:id', verify, UserController.get_a_user )

//delete user
router.delete("/:id", verify, UserController.delete_a_user )

module.exports = router;
