const router = require("express").Router();

const { register, loginUser } = require("../controller/user.js")

router.post("/signup", register)
router.post("/signin", loginUser)
module.exports = router