const { Schema, model } = require("mongoose");

// **************** User Schema/blueprint with user collection ****************
const userSchema = new Schema(
    {
        name: { type: String, required: true },
        password: { type: String, required: true }
    },
    { versionKey: false, timestamps: true }
);

//Model of event
const UserModel = model("user", userSchema);

module.exports = UserModel;