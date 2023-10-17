const express = require('express');
const router = express.Router();
const product = require("../model/product.js")
const auth = require("../controller/middle.js")
const role = require("../controller/auth.js")
const { ROLE } = require("../model/role.js")
router.post(
    '/addItems',
    auth,
    role.check(ROLE.admin),

    async (req, res) => {
        try {
            console.log(req.body)
            const { sku,
                name,
                description,
                quantity,
                price,
            } = req.body

            if (!sku) {
                return res.status(400).json({ error: 'You must enter sku.' });
            }

            if (!description) {
                return res.status(400).json({ error: 'You must enter description .' });
            }
            if (!name) {
                return res.status(400).json({ error: 'You must enter name.' });

            }
            if (!quantity) {
                return res.status(400).json({ error: 'You must enter a quantity.' });
            }

            if (!price) {
                return res.status(400).json({ error: 'You must enter a price.' });
            }

            const foundProduct = await product.findOne({ sku });

            if (foundProduct) {
                return res.status(400).json({ error: 'This sku is already in use.' });
            }
            console.log(foundProduct)
            const newproduct = new product({
                sku,
                name,
                description,
                quantity,
                price,

            });

            const savedProduct = await newproduct.save();
            console.log("savedProduct:", savedProduct)
            res.status(200).json({
                success: true,
                message: `Product has been added successfully!`,
                product: savedProduct
            });
        } catch (error) {
            console.log("error:", error)
            return res.status(400).json({
                error: 'Your request could not be processed. Please try again.'
            });
        }
    }
);
router.delete(
    '/delete/:id',
    auth,
    role.check(ROLE.admin),
    async (req, res) => {
        try {

            const Product = await product.deleteOne({ _id: req.params.id });

            res.status(200).json({
                success: true,
                message: `Product has been deleted successfully!`,
                Product
            });
        } catch (error) {
            res.status(400).json({
                error: 'Your request could not be processed. Please try again.'
            });
        }
    }
);

module.exports = router