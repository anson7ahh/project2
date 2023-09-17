const router = require("express").Router()
const { passport, checkRole } = require("../controller/middle.js")
const ROLE = require("../model/role.js")
const userAuth = require("../controller/auth.js")
router.get("/profile", userAuth, checkRole([ROLE.user]), async (req, res) => {
    res.status(200).json({ type: ROLE.user, user: serializeUser(req.user) });
});


module.exports = router