const userSchema = require("../models/user");
const contactSchema = require("../models/contact");

const express = require("express");
const router = express.Router();

router.get("/readContact", async (req, res) => {
    try {
        const { idUser } = req.query;
        const data = await contactSchema.find({idUser});
        res.status(200).send({ type: 'success', message: "dados requisitados com sucesso", data });
    } catch (error) {
        res.status(500).send({ type: 'error', message: error });
    }
});

router.post("/createContact", async (req, res) => {
    try {
        const contactBody = req.body;
        const newContact = new contactSchema(contactBody);
        const contact = await newContact.save();
        res.status(200).send({ type: "success", message: "contato criado com sucesso" })
    } catch (error) {
        res.status(500).send({ type: "error", message: error });
    }
});

router.put("/updateContact", async (req, res) => {
    try {
        const contactBody = req.body;
        const contact = await contactSchema.findByIdAndUpdate(contactBody._id, contactBody);
        res.status(200).send({ type: "success", message: "contato atualizado com sucesso" });
    } catch (error) {
        res.status(500).send({ type: "error", message: error })
    }
});

router.delete("/deleteContact", async (req, res) => {
    try {
        const { idContact } = req.query;
        const contact = await contactSchema.findByIdAndRemove(idContact);
        res.status(200).send({ type: "success", message: "contato apagado com sucesso"});
    } catch (error) {
        res.stauts(500).send({ type: "error", message: error });
    }
});

module.exports = router;
