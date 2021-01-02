const { response } = require("express");
const User = require("../models/user");

const getUsers = async(req, res = response) => {

    //Listar, ordenar de manera descendente, 
    // -online descendente, online ascendente
    // filtrar los usuarios y excluir el propio
    const users = await User
        .find({ _id: { $ne: req.uid } })
        .sort("-online");

    try {

        return res.status(400).json({
            ok: true,
            users,
            count: users.length
        });
    } catch (e) {

        console.log(e);
        res.status(500).json({
            ok: false,
            msg: "Hable con el admin"
        });
    }
}

const getUsersPages = async(req, res = response) => {

    // Paginacion de 10 en 10, se manda el numero de pagina: ?page=1
    // const desde = Number(req.query.desde) || 0;
    var page = Number(req.query.page) || 1;
    page = page - 1;

    //Listar, ordenar de manera descendente, 
    // -online descendente, online ascendente
    // filtrar los usuarios y excluir el propio
    const users = await User
        .find({ _id: { $ne: req.uid } })
        .sort("-online")
        .skip(20 * page)
        .limit(20);

    try {

        return res.status(400).json({
            ok: true,
            users,
            count: users.length
        });
    } catch (e) {

        console.log(e);
        res.status(500).json({
            ok: false,
            msg: "Hable con el admin"
        });
    }
}

module.exports = {
    getUsers,
    getUsersPages
}