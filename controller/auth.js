const jwt = require("jsonwebtoken");
const checkAuth = async (req, res, next) => {
    try {
        if (!req.headers.authorization) {
            return null
        } const token = await (jwt.verify(req.headers.authorization.split(" ")[1]) || req.headers.authorization)
        if (!token) { return null }
        return token
    } catch (err) { next(err) }
}

const check =
    (...roles) =>
        (req, res, next) => {

            if (!req.user) {
                return res.status(401).send('Unauthorized');
            }
            const hasRole = roles.find(role => req.user.role === role);
            if (!hasRole) {
                return res.status(403).send('You are not allowed to make this request.');
            }

            return next();
        };

const role = { check }
module.exports = role, checkAuth;



