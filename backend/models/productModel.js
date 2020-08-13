import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true, trim: true},
    image: {type: String, required: true},
    images: {type: Array, required: true},
    brand: {type: String, required: true},
    price: {type: Number, default: 0, required: true},
    category: {type: String, required: true},
    countInStock: {type: Number, required: true},
    title: {type: String, required: true},
    description: {type: String, required: true},
    rating: {type: Number, default: 0},
    numReviews: {type: Number, default: 0},
    date: {type: String, default: new Date()}
});

const productModel = mongoose.model("Product", productSchema);

export default productModel;