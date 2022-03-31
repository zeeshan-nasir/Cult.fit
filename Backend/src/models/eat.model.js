const mongoose = require("mongoose");

let eatSchema = new mongoose.Schema({
    img_url: { type: String, required: true },
    name: { type: String, required: true },
    type: { type: String, required: true },
    cal: { type: Number, required: true },
    fiber: { type: String, required: true },
    price: { type: Number, required: true },
    str_price: { type: Number, required: true },
    variety: { type: String, required: true }
}, {
    timestamps: true,
    versionKey: false
});

const Eat = mongoose.model("eat", eatSchema);

module.exports = Eat;