import express from 'express';
import Product from '../models/productModel';
import { isAdmin, isAuth } from '../util';
import fs from 'fs';

const router = express.Router();

router.get("/", async (req,res) => {
    if (req.query.category) {
        const products = await Product.find({category: req.query.category}).sort( { _id: -1 } );
        return res.send(products);
    } else {
        const products = await Product.find({}).sort( { _id: -1 } );
        return res.send(products);
    }
    
})


router.get("/:id", async (req,res) => {
    const productId = req.params.id;
    const product = await Product.findOne({
        _id: productId,
    });
    if (product) {
        return res.send(product);
    } else {
        return res.status(404).send({mess: "Product not found."});
    }
})

 
router.post("/", async (req,res) => {
    const file = req.files.image;
    
    file.mv(`./frontend/public/images/${file.name}`, err => {
        if (err) {
            console.log(err);
            return res.status(500).send(err);
        }
    });

    const reqFiles = [];
    for (var i = 0; i < req.files.images.length; i++) {
        file.mv(`./frontend/public/images/product/${req.files.images[i].name}`, err => {
            if (err) {
                console.log(err);
                return res.status(500).send(err);
            }
        });
        reqFiles.push( req.files.images[i].name);
    }

    const product = new Product({
        name: req.body.name,
        price: req.body.price,
        image: file.name,
        images: reqFiles,
        brand: req.body.brand,
        category: req.body.category,
        countInStock: req.body.countinstock,
        title: req.body.title,
        description: req.body.description,
        date: new Date(),
    });
    const newProduct = await product.save();
    if (newProduct) {
        return res.status(201).send({msg: "New Product Created", data: newProduct});
    }
    return res.status(500).send({msg: "Error In Created Product", data: newProduct});
})

router.put("/:id", isAuth, isAdmin, async (req,res) => {
    const id = req.params.id;
    const product = await Product.findById(id);

    if (product) {
        if (req.files.image) {
            const file = req.files.image;
            console.log(file);

            fs.unlinkSync(`./frontend/public/images/${product.image}`, err => {
                if (err) {
                    console.log(err);
                    return res.status(500).send(err);
                }
            });

            file.mv(`./frontend/public/images/${file.name}`, err => {
                if (err) {
                    console.log(err);
                    return res.status(500).send(err);
                }
            });
            product.image = file.name || product.image;
        }

        if (req.files.images) {
            const reqFiles = [];

            if (product.images) {
                product.images.map(x => {
                    fs.unlinkSync(`./frontend/public/images/product/${x}`, err => {
                        if (err) {
                            console.log(err);
                            return res.status(500).send(err);
                        }
                    });
                })
            }

            for (var i = 0; i < req.files.images.length; i++) {
                req.files.images[i].mv(`./frontend/public/images/product/${req.files.images[i].name}`, err => {
                    if (err) {
                        console.log(err);
                        return res.status(500).send(err);
                    }
                });
                reqFiles.push( req.files.images[i].name);
            }

            product.images = reqFiles || product.images;
        }

        product.name = req.body.name || product.name;
        product.price = req.body.price || product.price;
        product.brand = req.body.brand || product.brand;
        product.category = req.body.category || product.category; 
        product.countInStock = req.body.countinstock || product.countinstock;
        product.title = req.body.title || product.title;
        product.description = req.body.description || product.description;
        const updateProduct = await product.save();
        if (updateProduct) {
            return res.status(200).send({msg: "Product Updated", data: updateProduct});
        }
    }
    return res.status(404).send({msg: "Error In Updating Product", data: updateProduct});
})

router.delete("/:id", isAuth, isAdmin, async (req,res) => {
    const id = req.params.id;
    const delProduct = await Product.findByIdAndDelete(id);
    if (delProduct) {
        return res.status(201).send({msg: "Delete Success", data: delProduct});
    }
    return res.status(500).send({msg: "Error Delete Product", data: delProduct});
})

export default router;