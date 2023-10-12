
const auth = require("../controller/middle.js")
const router = require("express").Router()
const Order = require('../model/order.js')

router.post("/order", auth, async (req, res, next) => {
    try {
        const cart = req.body.cartId;
        const total = req.body.total;
        const user = req.user._id;
        const order = await new Order({
            cart, total, user
        });
        const orderDoc = await order.save();
        console.log(orderDoc)
        res.status(200).json({
            success: true,
            message: `Your order has been placed successfully!`,
            order: { _id: orderDoc.id }
        });
    } catch (error) {
        next(error)
    }
})

module.exports = router