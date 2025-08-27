import {fileURLToPath} from 'url';
import path from 'path';
import Fastify from 'fastify';
import fastifyCors from '@fastify/cors';
import fastifyStatic from '@fastify/static';
import fs from 'fs';
import os from "os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const fastify = Fastify({logger: true});
const frontend_distribution = path.resolve(__dirname, '..', 'dist')

let todos = [];
const frontendExists = fs.existsSync(frontend_distribution);

// <i> CORS origin * is useful ONLY when front-end is from another origin
fastify.register(fastifyCors, {origin: "*"});

// Serve static files du build frontend
if (frontendExists) {
    fastify.register(fastifyStatic, {
        root: frontend_distribution,
        prefix: '/',
    });
}

// Route pour récupérer la liste des todos
fastify.get('/api/todos', async () => {
    return todos;
});

// Route pour ajouter un nouveau todo
fastify.post('/api/todos', async (request, reply) => {
    const {task} = request.body;
    if (!task) {
        reply.status(400).send({error: 'Task is required'});
        return;
    }
    const newTodo = {id: Date.now(), task, completed: false};
    todos.push(newTodo);
    return newTodo;
});

let app;
// Démarrer le serveur
const startServer = async () => {
    const port = 4000;
    const host = '0.0.0.0';
    const nodeVersion = process.version;
    const userEndpoint = `http://${host}:${port}`;
    try {
        app = await fastify.listen({host, port});
        let serverDescription = `Server (os: ${os.platform()} node:${nodeVersion}) listening on ${userEndpoint}`;
        if (frontendExists) {
            serverDescription += ' (with frontend)';
        }
        fastify.log.info(serverDescription);
        return app;
    } catch (err) {
        fastify.log.error(err);
        process.exit(1);
    }
};

startServer();

export default startServer;