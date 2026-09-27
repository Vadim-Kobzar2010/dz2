import {
    getPosts,
    getPost,
    createPost
} from "../services/post.js";

export function getAllPosts(req, res) {
    const { category, take } = req.query;

    const posts = getPosts(category, take);

    res.status(200).json(posts);
}

export function getOnePost(req, res) {
    const post = getPost(req.params.id);

    if (!post) {
        return res.status(404).json({
            message: "Post not found"
        });
    }

    res.status(200).json(post);
}

export async function createNewPost(req, res) {
    const { title, content, author, category } = req.body;

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