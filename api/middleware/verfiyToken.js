const jwt = require("jsonwebtoken")

module.exports = auth = (req, res, next) => {
    const token = req.header("auth-token");
    if (!token) return res.status(401).redirect("/").send("Unauthorized");

    try {
        const verified = jwt.verify(token, process.env.TOKEN_SECRET);
        req.user = verified;
    } catch (err) {
        res.status(400).redirect("/").send("Invalid token!");
    }
    next()
}
