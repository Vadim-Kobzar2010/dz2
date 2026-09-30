import express from "express";

import { createRepository } from "./repositories/post.js";
import { createService } from "./services/post.js";
import { createHandlers } from "./handlers/post.js";
import { createRouter } from "./routers/post.js";



const app = express();

app.use(express.json());

const repository = createRepository();
const service = createService(repository);
const handlers = createHandlers(service);
const router = createRouter(handlers);

app.use(router);

const PORT = 3000;
const HOST = "localhost"

app.listen(PORT, () => {
    console.log(`Server started: http://${HOST}:${PORT}`);
});