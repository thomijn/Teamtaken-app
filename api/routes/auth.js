const router = require("express").Router();
const { registerValidation, loginValidation } = require("../validate/validation")
const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")

// User Model
const User = require("../models/User");

//registration
router.post("/register", async (req, res) => {

    // validation
    // const { error } = registerValidation(req.body)
    // if (error) return res.status(400).send(error.details[0].message)

    // check if email already exists
    const emailExist = await User.findOne({ email: req.body.email });
    if (emailExist) return res.status(400).send("Email already exists.")

    //hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt)

    const user = new User({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        email: req.body.email,
        password: hashedPassword
    });

    user.save()
        .then((user) => res.json({ msg: "Team succesfully added", user }))
        .catch(err => res.status(404).send(err))

    res.render('register');

})

//login
router.post("/login", async (req, res) => {

    // validation
    // const { error } = loginValidation(req.body)
    // if (error) return res.status(400).send(error.details[0].message)

    //check if email exists
    const user = await User.findOne({ email: req.body.email });
    if (!user) return res.status(400).send("invalid credentials")

    //valid password
    const validPass = await bcrypt.compare(req.body.password, user.password);
    if (!validPass) return res.status(400).send("invalid credentials")

    //JWT token
    const token = jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET)
    res.header("auth-token", token).json({ msg: "succesfully logged in" })

})

module.exports = router;
