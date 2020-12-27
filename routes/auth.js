/*
    path: /api/login
*/

const { Router } = require("express");
const { check } = require("express-validator");

const { crearUsuario, login, renewToken } = require("../controllers/auth");
const { validarCampos } = require("../middlewares/validar_campos");
const { validateJWT } = require("../middlewares/validar_jwt")
const router = Router();

// Register
router.post("/new", [
    check("name", "El nombre es obligatorio").not().isEmpty(),
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos
], crearUsuario);

// Login
router.post("/", [
    check("email", "El email es obligatorio").isEmail(),
    check("password", "El password es obligatorio").not().isEmpty(),
    validarCampos
], login);

// Token renew
router.get("/renew", validateJWT, renewToken);



module.exports = router;