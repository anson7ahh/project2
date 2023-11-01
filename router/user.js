const router = require("express").Router();
const user = require("../model/user");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const auth = require("../controller/middle.js")
const role = require("../controller/auth.js")
const { ROLE } = require("../model/role.js")
router.post("/signup", async (req, res, next) => {
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

})
router.post("/signin", async (req, res, next) => {
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
            id: account.id
        };
        const accessToken = await jwt.sign(
            payload
            , process.env.privateKey,
            { expiresIn: "365d" })
        if (!accessToken) { throw new Error(); }

        return res.status(200).json({
            token: `Bearer ${accessToken}`,
            user: {
                _id: account.id,
                name: account.name,
                email: account.email,
                role: account.role
            },

        });


    } catch (err) {
        next(err);
    }
}
)
router.put("/update", auth, async (req, res, next) => {
    try {

        const { _id } = req.user
        if (!_id) throw new Error('Missing inputs')
        const response = await user.findByIdAndUpdate(_id, req.body, { new: true })
            .select('-password -role ')
        return res.status(200).json({
            success: response ? true : false,
            updatedUser: response ? response : 'Some thing went wrong'
        })

    }
    catch (error) {
        next(error)
    }
})
router.put("/update_by_admin/:_id", auth, role.check(ROLE.admin), async (req, res, next) => {
    try {
        const { _id } = req.params
        const response = await user.findByIdAndUpdate(_id, req.body, { new: true })
        if (!_id) throw new Error('Missing inputs')
        return res.status(200).json({
            success: `thanh cong`,
            response
        })
    } catch (error) {
        next(error)
    }
})
router.delete("/delete", auth, async (req, res, next) => {
    try {

        const { _id } = req.user
        if (!_id) throw new Error('Missing inputs')
        const response = await user.findOneAndDelete({ _id: _id })

        return res.status(200).json({
            success: `thanh cong`,
            response
        })

    }
    catch (error) {
        next(error)
    }
})

router.delete("/delete_by_admin/:_id", auth, role.check(ROLE.admin), async (req, res, next) => {
    try {
        const { _id } = req.params
        const response = await user.findOneAndDelete({ _id: _id })
        if (!_id) throw new Error('Missing inputs')
        return res.status(200).json({
            success: `thanh cong`,
            response
        })
    } catch (error) {
        next(error)
    }
})
module.exports = router