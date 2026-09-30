import { Request, Response } from "express";
import { createService } from "../services/post.js";
import { CreatePostDto } from "../dto/post.js";


export function createHandlers(
    service: ReturnType<typeof createService>
) {
    async function getAllPosts(
        req: Request,
        res: Response
    ) {
        const category = req.query.category as string | undefined;
        const take = req.query.take
            ? Number(req.query.take)
            : undefined;

        const posts = service.getPosts(category, take);

        res.status(200).json(posts);
    }

    function getOnePost(
        req: Request,
        res: Response
    ) {
        const id = Number(req.params.id);

        const post = service.getPost(id);

        if (!post) {
            return res.status(404).json({
                message: "Пост не найден"
            });
        }

        return res.status(200).json(post);
    }

    async function createNewPost(
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
                message: "Название и содержание обязательные"
            });
        }

        try {
            const post = await service.createPost({
                title,
                content,
                author,
                category
            });

            return res.status(201).json(post);
        } catch (error) {
            return res.status(500).json({
                message: "ошибка сервера"
            });
        }
    }

    return {
        getAllPosts,
        getOnePost,
        createNewPost
    };
}