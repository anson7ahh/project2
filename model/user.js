const { mongoose, model } = require("mongoose")
const Schema = mongoose.Schema
const { ROLE } = require("./role.js");


mongoose.connect('mongodb://127.0.0.1:27017/test')
    .then(() => console.log('Connected!'));
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
            default: "user",
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