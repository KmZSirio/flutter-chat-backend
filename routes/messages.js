/*
    path: /api/messages
*/

const { Router } = require("express");
const { validateJWT } = require("../middlewares/validar_jwt");

const { getChat } = require("../controllers/messages");

const router = Router();

// Obtener lista de usuarios menos el mismo
router.get("/:from", validateJWT, getChat);


module.exports = router;