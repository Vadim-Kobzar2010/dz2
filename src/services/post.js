import { getAll, getById, addPost } from "../repositories/post.js";

export function getPosts(category, take) {
    return getAll(category, take);
}

export function getPost(id) {
    return getById(id);
}

export function createPost(post) {
    return addPost(post);
}