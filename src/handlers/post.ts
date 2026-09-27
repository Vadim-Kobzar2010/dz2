import { Request, Response } from "express";

import {
    getPosts,
    getPost,
    createPost
} from "../services/post.js";

import { CreatePostDto } from "../dto/post.js";

export function getAllPosts(
    req: Request,
    res: Response
) {
    const category = req.query.category as string | undefined;
    const take = req.query.take
        ? Number(req.query.take)
        : undefined;

    const posts = getPosts(category, take);

    res.status(200).json(posts);
}

export function getOnePost(
    req: Request,
    res: Response
) {
    const id = Number(req.params.id);

    const post = getPost(id);

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    res.status(200).json(post);
}

export async function createNewPost(
    req: Request<{}, {}, CreatePostDto>,
    res: Response
) {
    const {
        title,
        content,
        author,
        category
    } = req.body;

    if (!title || !content) {
        return res.status(422).json({
            message: "Title and content are required"
        });
    }

    const newPost = {
        id: Date.now(),
        title,
        content,
        author: author || "Anonymous",
        category: category || "general"
    };

    const post = await createPost(newPost);

    res.status(201).json(post);
}