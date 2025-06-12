import startServer from "./src/server.js";

startServer()
    .then(console.info)
    .catch(console.error);