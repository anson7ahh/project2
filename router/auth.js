const router = require("express").Router()
const passport = require("passport")
const { ROLE } = require("../model/role.js")
const role = require("../controller/auth.js")
const auth = require("../controller/middle.js")


router.get('/search', auth, role.check(ROLE.user), (req, res) => { res.json('hello') })

module.exports = router