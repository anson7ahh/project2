const user = require("../model/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const register = async (req, res, next) => {
    try {
        const { name, password, email } = req.body;
        const check = await user.findOne({ email: email })
        if (!check) {
            const newuser = await user.create({
                name: name,
                password: bcrypt.hashSync(password, 10),
                email: email

            })
            return res.json({
                message: "User created successfully",
                newuser
            })
        }
        return res.json("account had already!!")


    } catch (error) {
        next(error)
    }

}


const loginUser = async (req, res, next) => {
    try {
        const { name, password, email } = req.body
        const account = await user.findOne({ email: email })
        if (!account) {
            return res.json("no such account")
        }

        const comparePassword = await bcrypt.compare(password, account.password)
        if (!comparePassword) {
            return res.json("password wrong")
        }
        const payload = {
            id: user.id
        };
        const accessToken = await jwt.sign({
            payload
        }, process.env.privateKey,
            { expiresIn: "365d" })
        if (!accessToken) { throw new Error(); }

        return res.status(200).json({
            token: `Bearer ${accessToken}`,
            user: {
                id: account.id,
                name: account.name,
                email: account.email,
                role: account.role
            }
        });


    } catch (err) {
        next(err);
    }
}


module.exports = {
    register, loginUser
}