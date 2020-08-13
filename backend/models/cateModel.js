import mongoose from 'mongoose';

const cateSchema = new mongoose.Schema({
    name: {type: String, required: true, unique: true, trim: true},
    description: {type: String, required: true},
    date: {type: String, default: new Date()}
});

const orderModel = mongoose.model("Category", cateSchema);

export default orderModel;