import express from 'express';
import Order from '../models/orderModel';
import { isAuth } from '../util';

const router = express.Router();

router.post("/", async (req, res) => {
    const order = new Order({
        name: req.body.name,
        address: req.body.address,
        city: req.body.city,
        postal: req.body.postal,
        country: req.body.country,
        cartItems: req.body.cartItems,
        payment: req.body.payment,
        totalPrice: req.body.totalPrice,
        date: new Date(),
    });
    const newOrder = await order.save();
    if (newOrder) {
        return res.status(201).send({msg: "New Order Created", data: newOrder});
    } else {
        return res.status(500).send({msg: "Error In Created New Order", data: newOrder});
    }
});

router.get("/", async (req, res) => {
    const order = await Order.find({});
    return res.status(201).send(order);
});

router.get("/:id", async (req, res) => {
    const orderId = req.params.id;
    const order = await Order.findOne({
        _id: orderId
    });
    console.log(order);
    if (order) {
        return res.status(201).send(order);
    } else {
        return res.status(404).send({mess: "Product not found."});
    }
});

export default router;