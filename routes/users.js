/*
    path: /api/users
*/

const { Router } = require("express");

const { validateJWT } = require("../middlewares/validar_jwt");
const { getUsers, getUsersPages } = require("../controllers/users");
const router = Router();

// Obtener lista de usuarios menos el mismo
router.get("/", validateJWT, getUsers);
// Obtener lista por pagina: users/pages?page=1
router.get("/pages", validateJWT, getUsersPages);



module.exports = router;