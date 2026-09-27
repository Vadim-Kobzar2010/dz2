import express from "express";

import {
    getAllPosts,
    getOnePost,
    createNewPost
} from "../handlers/post.js";

const router = express.Router();

router.get("/posts", getAllPosts);
router.get("/posts/:id", getOnePost);
router.post("/posts", createNewPost);

export default router;