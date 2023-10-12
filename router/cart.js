const express = require('express');
const router = express.Router();
const Cart = require("../model/cart.js");
const product = require("../model/product.js");
const auth = require("../controller/middle.js");
router.post('/cart', auth, async (req, res, next) => {
    try {
        const user = req.user._id;
        const items = req.body.products;
        console.log(items)
        const cart = new Cart({
            user,
            items
        });

        const cartDoc = await cart.save();
        res.status(200).json({
            success: true,
            cartId: cartDoc.id
        });
    } catch (error) {
        next(error)


    }
});


module.exports = router
