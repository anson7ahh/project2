const { mongoose, model } = require("mongoose");
const { Schema } = mongoose
const productSchema = mongoose.Schema({
    sku: {
        type: String
    },
    name: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },

    quantity: {
        type: Number,
        require: true
    }

});

const Product = model("product", productSchema);
module.exports = Product;

