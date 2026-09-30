import express from "express";
import { createHandlers } from "../handlers/post.js";


export function createRouter(
    handlers: ReturnType<typeof createHandlers>
) {
    const router = express.Router();

    router.get("/posts", handlers.getAllPosts);
    router.get("/posts/:id", handlers.getOnePost);
    router.post("/posts", handlers.createNewPost);

    return router;
}   