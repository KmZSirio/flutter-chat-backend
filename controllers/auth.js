const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");



const crearUsuario = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const emailExists = await User.findOne({ email }); // email o email: email
        if (emailExists) {
            return res.status(400).json({
                ok: false,
                msg: "El correo ya esta registrado"
            });
        }

        const user = new User(req.body);

        // Encriptacion de la contraseña
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        await user.save();

        // Generar JWT
        const token = await generateJWT(user.id)

        res.json({
            ok: true,
            user,
            token
            // msg: "Usuario creado."
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: "Hable con el admin"
        });
    }
}

const login = async(req, res = response) => {

    const { email, password } = req.body;

    try {

        const userDB = await User.findOne({ email });
        if (!userDB) {
            return res.status(404).json({
                ok: false,
                msg: "Email no encontrado"
            });
        }

        // Validar el password
        const validPassword = bcrypt.compareSync(password, userDB.password);
        if (!validPassword) {
            return res.status(400).json({
                ok: false,
                msg: "Contraseña no valida"
            });
        }

        // Generar JWT
        const token = await generateJWT(userDB.id)

        res.json({
            ok: true,
            user: userDB,
            token
            // msg: "Usuario creado."
        });

    } catch (e) {
        console.log(e);
        res.status(500).json({
            ok: false,
            msg: "Hable con el admin"
        });
    }
}

const renewToken = async(req, res = response) => {

    const uid = req.uid;

    // Generar nuevo JWT
    const token = await generateJWT(uid);
    const userToken = await User.findById(uid);

    res.json({
        ok: true,
        user: userToken,
        token
    });
}

module.exports = {
    crearUsuario,
    login,
    renewToken
}