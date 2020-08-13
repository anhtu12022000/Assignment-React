import express from 'express';
import Contact from '../models/contactModel';

const router =  express.Router();


router.get("/", async (req,res) => {
    const contacts = await Contact.find({});
    return res.send(contacts);
})

router.post("/", async (req,res) => {
    const contact = new Contact({
        name: req.body.name,
        email: req.body.email,
        subject: req.body.subject,
        context: req.body.context,
        date: new Date(),
    });

    const newContact = contact.save();

    if (newContact) {
        return res.status(201).send({msg: "Create contact successfully", data: newContact});
    }
    return res.status(500).send({msg: "Error In Created contact", data: newContact});
})

router.post("/delmutil", async (req,res) => {
    var contactDelete = req.body;
     
    const delContact = await Contact.deleteMany({
        _id: {$in: contactDelete}
    });
    
    if (delContact) {
        return res.status(201).send({msg: "Delete Contacts Success", data: delContact});
    }
    return res.status(500).send({msg: "Error Delete Contacts", data: delContact});
})

export default router;