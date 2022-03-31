const mongoose = require("mongoose");

let checkoutSchema = new mongoose.Schema({
    firstName: { type: String, required: true },
    lastName: { type: String, required: true },
    address: { type: String, required: true },
    city: { type: String, required: true },
    state: { type: String, required: true },
    zip: { type: Number, required: true },
    phone: { type: String, required: true },
    email: { type: String, required: true }
}, {
    timestamps: true,
    versionKey: false
});


const Checkout = mongoose.model("checkout", checkoutSchema);

module.exports = Checkout;