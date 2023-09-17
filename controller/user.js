const user = require("../model/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = async (req, role, res, next) => {
    try {
        const { name, email, password } = req.body
        const check = await user.findOne({ email: email })

        if (check) { return res.json("account had already") }


        const newUser = await user.create({
            name: name,
            password: bcrypt.hashSync(password, 10),
            email: email,
            role: role
        })
        return res.status(201).json({
            message: "User has been created successfuly",
            newUser
        })

    } catch (error) {
        next(error)
    }
}



const loginUser = async (req, role, res, next) => {
    try {
        const { name, password, email } = req.body
        const Email = await user.findOne({ email: email })
        if (!Email) {
            return res.json("no such account")
        } if (Email.role !== role) {
            return res.status(403).json({
                reason: "role",
                success: false,
            });
        }
        const comparePassword = await bcrypt.compare(password, Email.password)
        if (!comparePassword) {
            return res.json("password wrong")
        }
        const accessToken = await jwt.sign({
            name: user.name,
            role: user.role,
            email: user.email
        }, process.env.privateKey,
            { expiresIn: "365d" })
        return res.json({
            massage: "login success",
            accessToken
        })



    } catch (err) {
        next(err);
    }
}


module.exports = {
    register, loginUser
}