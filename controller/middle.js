
const checkRole = (role) => {
    return (req, res, next) => {

        if (!role.includes(req.user.role)) {
            return res.status(401).json(`u don't have a permission`)
        }
        next()
    }

}

module.exports = { checkRole } 