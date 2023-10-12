const router = require("express").Router()
const passport = require("passport")
const { ROLE } = require("../model/role.js")
const role = require("../controller/auth.js")
const auth = require("../controller/middle.js")


router.get('/search', auth, role.check(ROLE.admin), (req, res, next) => {
    console.log("hello")
    return res.status(200).json({ done: true })
})

module.exports = router