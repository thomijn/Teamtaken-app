const router = require("express").Router();
const UserController = require("../controllers/users")

//get users
router.get('/', UserController.get_all_users);

//get specific user
router.get('/:id', UserController.get_a_user)

//delete user
router.delete("/:id", UserController.delete_a_user)

module.exports = router;
