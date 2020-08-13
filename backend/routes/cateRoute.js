import express from 'express';
import Cate from '../models/cateModel';
import { isAdmin, isAuth } from '../util';

const router = express.Router();

router.get("/", async (req,res) => {
    const category = await Cate.find({});
    return res.send(category);
})

router.post("/", async (req,res) => {

    const cate = new Cate({
        name: req.body.name,
        description: req.body.description,
        date: new Date(),
    });

    const newCate = await cate.save();

    if (newCate) {
        return res.status(201).send({msg: "Created category successfully", data: newCate});
    } else {
        return res.status(401).send({msg: "Invalid Category Data."});
    }
});

router.delete("/:id", isAuth, isAdmin, async (req,res) => {
    const id = req.params.id;
    const delCate = await Cate.findByIdAndDelete(id);
    if (delCate) {
        return res.status(201).send({msg: "Delete Success", data: delCate});
    }
    return res.status(500).send({msg: "Error Delete Category", data: delCate});
})

export default router;
