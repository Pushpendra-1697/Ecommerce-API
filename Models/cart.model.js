const { Schema, model } = require("mongoose");

// **************** Cart Schema with cart collection ****************
const CartSchema = new Schema(
    {
        userId: {
            type: Schema.Types.ObjectId,
            ref: "user",
            required: true,
        },
        products: [
            {
                productId: {
                    type: Schema.Types.ObjectId,
                    ref: "product",
                    required: true,
                },
                quantity: { type: Number, default: 1 },
            },
        ],
        active: {
            type: Boolean,
            default: true,
        },
        modifiedOn: {
            type: Date,
            default: Date.now,
        }
    },
    { versionKey: false, timestamps: true }
);

const CartModel = model("cart", CartSchema);

module.exports = CartModel;