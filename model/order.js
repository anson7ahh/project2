const { mongoose, model } = require("mongoose");
const { Schema } = mongoose;

const OrderSchema = new Schema({
    cart: {
        type: Schema.Types.ObjectId,
        ref: 'Cart',

    },
    user: {
        type: Schema.Types.ObjectId,
        ref: 'User',

    },
    product: {
        type: Schema.Types.ObjectId,
        ref: 'Product',

    },
    total: {
        type: Number,
        default: 0
    },
    updated: Date,
    created: {
        type: Date,
        default: Date.now
    }

});
const Order = model("Order", OrderSchema);
module.exports = Order