import express from 'express';
import User from '../models/userModel';
import { isAdmin, isAuth } from '../util';
import { getToken } from '../util';

const router = express.Router();


router.get("/", async (req,res) => {
    const users = await User.find({});
    return res.send(users);
      
})

router.post("/register", async (req,res) => {
    const user = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        date: new Date(),
    });

    const newUser = await user.save();

    if (newUser) {
        res.send({
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
        });
    } else {
        res.status(401).send({msg: "Invalid User Data."});
    }
});

router.post("/signin", async (req,res) => {
    const signinUser = await User.findOne({
        email: req.body.email,
        password: req.body.password,
    });

    if (signinUser) {
        res.send({
            _id: signinUser._id,
            name: signinUser.name,
            email: signinUser.email,
            isAdmin: signinUser.isAdmin,
            token: getToken(signinUser),
        });
    } else {
        res.status(401).send({msg: "Invalid Email or Password."});
    }
})

router.get("/createadmin", async (req, res) => {
    try {
        const user = new User({
            name: 'Anh Tú',
            email: 'vungoctu.dev@gmail.com',
            password: '123456',
            isAdmin: true
        });
    
        const newUser = await user.save();
        res.send(newUser);
    } catch (error) {
        res.send({ msg: error.message });
    }
});

router.patch("/:id", isAuth, isAdmin, async (req,res) => {
    const id = req.params.id;
    const user = await User.findById(id);
    if (user) {
        user.isAdmin = !user.isAdmin;
    }
    const updateUser = await user.save();
        if (updateUser) {
            console.log(updateUser);
            return res.status(200).send({msg: "User Updated", data: updateUser});
    }
})
 
export default router;