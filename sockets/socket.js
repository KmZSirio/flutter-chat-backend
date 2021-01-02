const { checkJWT } = require('../helpers/jwt');
const { io } = require('../index');
const { userOnline, userOffline, saveMessage } = require("../controllers/socket");


// Mensajes de Sockets
io.on('connection', client => {
    // console.log('Cliente conectandose');

    const [valido, uid] = checkJWT(client.handshake.headers['x-token']);

    if (!valido) {
        // console.log('Cliente rechazado');
        return client.disconnect();
    }

    // console.log("Cliente autenticado");
    userOnline(uid);

    // Ingresar al user a una sala en especifica
    client.join(uid);

    // Escuchar mensaje personal
    client.on("personal-message", async(payload) => {
        // TODO: Grabar mensaje
        await saveMessage(payload);

        io.to(payload.to).emit("personal-message", payload);
    });

    client.on('disconnect', () => {
        // console.log('Cliente desconectado');
        userOffline(uid);
    });
});