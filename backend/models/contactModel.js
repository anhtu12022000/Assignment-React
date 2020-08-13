import mongoose from 'mongoose';

const contactSchema = new mongoose.Schema({
    name: {type: String, required: true},
    email: {type: String, required: true},
    subject: {type: String, required: true},
    context: {type: String, required: true},
    date: {type: String, default: new Date()}
});

const contactModel = mongoose.model("Contact", contactSchema);

export default contactModel;