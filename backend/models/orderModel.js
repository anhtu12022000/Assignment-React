import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    name: {type: String, required: true},
    address: {type: String, required: true},
    city: {type: String, required: true},
    postal: {type: String, required: true},
    country: {type: String, required: true},
    cartItems: {type: String, required: true},
    payment: {type: String, required: true},
    totalPrice: {type: Number, required: true},
    date: {type: String, default: new Date()}
});

const orderModel = mongoose.model("Order", orderSchema);

export default orderModel;