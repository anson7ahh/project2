const { mongoose, model } = require("mongoose")
const Schema = mongoose.Schema
const { ROLE } = require("./role.js");

const UserSchema = new Schema(
    {
        name: {
            type: String,
            required: true,
        },

        email: {
            type: String,
            required: true,
        },
        role: {
            type: String,
            default: ROLE.user,
            enum: [ROLE.user, ROLE.admin, ROLE.manager],
        },

        password: {
            type: String,
            required: true,
        },
    },
    { timestamps: true }
);


const user = model("users", UserSchema);
module.exports = user