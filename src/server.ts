import express from "express";
import postRouter from "./routers/post.js";

const app = express();

const PORT = 3000;
const HOST = "localhost";

app.use(express.json());

app.use(postRouter);

app.listen(PORT, HOST, () => {
    console.log(`Server started: http://${HOST}:${PORT}`);
});