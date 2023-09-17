const router = require("express").Router();
const { checkRole } = require("../controller/middle.js")
const { register, loginUser } = require("../controller/user.js")
const userAuth = require("../controller/auth.js")
const { ROLE } = require("../model/role.js")
// signup user
router.post("/signup-user", async (req, res, next) => {
    register(req, ROLE.user, res, next)
})

// sign up admin
router.post("/signup-admin", async (req, res, next) => {
    register(req, ROLE.admin, res, next)
})
// signup manager
router.post("/signup-manager", async (req, res, next) => {
    register(req, ROLE.manager, res, next)
})

// login user
router.post("/login", async (req, res, next) => {
    loginUser(req, ROLE.user, res, next)
}, userAuth)
// login admin
router.post("/login-admin", async (req, res, next) => {
    loginUser(req, ROLE.admin, res, next)
})
// login manager
router.post("/login-manager", async (req, res, next) => {
    loginUser(req, ROLE.manager, res, next)
})




module.exports = router