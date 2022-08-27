const userSchema = require("../models/user");

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const { authUser, sendJWT, verifyJWT } = require("../utils/jwtfunc");

const saltRounds = 10;

router.post("/register", async (req, res) => {
    try {
        const userData = req.body;

        if (!userData.username || !userData.password || !userData.email) {
            res.status(400).send({
                type: "error",
                message: "Missing data in body request",
            });
        }

        if (await userSchema.exists({ username: userData.username })) {
            res.status(200).send({
                type: "error",
                message: "Username already in use",
            });
        }

        if (await userSchema.exists({ email: userData.email })) {
            res.status(200).send({
                type: "error",
                message: "Email already in use",
            });
        }
        userData.password = await bcrypt.hash(userData.password, saltRounds);
        const newUser = new userSchema(userData);
        const user = await newUser.save();
        res.status(201).send({
            type: "success",
            message: "User successfully created",
        });
    } catch (error) {
        res.status(500).send({ type: "error", message: "Unkown error" });
    }
});

router.post("/login", async (req, res) => {
    try {
        const { username, password } = req.body;
        if (!username || !password) res.status(200).send({ type: "error", message: "falta dados"});
        const bdUser = await userSchema.findOne({ username });
        if (!bdUser) res.status(200).send({ type: "error", message: "dados inválidos" });
        const check = await bcrypt.compare(password, bdUser.password);
        if (!check) res.status(200).send({ type: "error", message: "senha inválida" });
        else res.status (200).send({ type: "success", message: "usuario logado com sucesso", data: bdUser });
    } catch (error) {
        res.status(500).send({ type: "error", message: error });
    }
});

module.exports = router;
