import {
    getAll,
    getById,
    addPost
} from "../repositories/post.js";

import { PostDto } from "../dto/post.js";

export function getPosts(
    category?: string,
    take?: number
): PostDto[] {
    return getAll(category, take);
}

export function getPost(id: number): PostDto | undefined {
    return getById(id);
}

export function createPost(post: PostDto): Promise<PostDto> {
    return addPost(post);
}