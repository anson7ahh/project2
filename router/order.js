const { ROLE } = require("../model/role.js")
const auth = require("../controller/middle.js")
const router = require("express").Router()
const Order = require('../model/order.js')
const role = require("../controller/auth.js")
const sendMail = require("../service/nodemail.js")
router.post("/order", auth, role.check(ROLE.admin), async (req, res, next) => {
    try {
        const cart = req.body.cartId;
        const total = req.body.total;
        const user = req.user._id;
        const email = req.user.email;
        const order = await new Order({
            cart, total, user
        });
        const orderDoc = await order.save();

        const html = `đơn hàng mới ${orderDoc}`
        const data = {
            html,
            email
        }
        const rs = sendMail(data)
        res.status(200).json({
            success: true,
            message: `Your order has been placed successfully!`,
            order: { _id: orderDoc.id },
            rs
        });
    } catch (error) {
        next(error)
    }
})

module.exports = router