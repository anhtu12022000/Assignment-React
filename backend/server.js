import express from 'express';
import dotenv from 'dotenv';
import config from './config';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import multer from 'multer';
import cors from 'cors';
import fileUpload from 'express-fileupload';

//Router
import userRoute from './routes/userRoute';
import productRoute from './routes/productRoute';
import orderRoute from './routes/orderRoute';
import cateRoute from './routes/cateRoute';
import contactRoute from './routes/contactRoute';

dotenv.config();

const mongodbUrl = config.MONGODB_URL;
const PORT = process.env.PORT || 8080; 

mongoose.connect(mongodbUrl, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
}).catch(error => console.log(error.reason));

mongoose.connection.on('connected', () => {
    console.log('Mongoose is connected');
})

const app = express();
app.use(cors());
app.use(fileUpload());
app.use(bodyParser.json());
app.use("/api/users", userRoute);
app.use("/api/contact", contactRoute);
app.use("/api/category", cateRoute);
app.use("/api/products", productRoute);
app.use("/api/order", orderRoute);


// app.get("/api/products", (req, res) => {
//     res.send(data.products);
// });

// app.get("/api/products/:id", (req, res) => {
//     const productId = req.params.id;
//     const product = data.products.find(x => x._id === productId);
//     if (product) {
//         res.send(product);
//     } else {
//         res.status(404).send({mess: "Product not found."});
//     }
// });

app.listen(PORT, () => {console.log(`Server started at POST ${PORT}`)});