const jwt = require("jsonwebtoken");

const generateJWT = (uid) => {

    return new Promise((resolve, reject) => {

        const payload = { uid };
        jwt.sign(payload, process.env.JWT_KEY, {
            expiresIn: "24h"
        }, (err, token) => {
            if (err) {
                // No se pudo crear
                reject("No se pudo generar el JWT");
            } else {
                // token
                resolve(token);
            }
        });
    });
}

const checkJWT = (token = "") => {

    try {

        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        // req.uid = uid;

        return [true, uid];

    } catch (e) {
        return [false, null];
    }
}


module.exports = {
    generateJWT,
    checkJWT
}