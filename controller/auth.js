const passport = require("passport")
const User = require("../model/user");
const register = require("./user.js")
const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;

const userAuth = passport.authenticate("jwt", {
    session: true
});
module.exports = userAuth
const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.SECRET
};

module.exports = passport => {
    passport.use(
        new JwtStrategy(opts, async (payload, done) => {
            await User.findById(payload.user_id)
                .then(user => {
                    if (user) {
                        return done(null, user);
                    }
                    return done(null, false);
                })
                .catch(err => {
                    return done(null, false);
                });
        })
    );
};


