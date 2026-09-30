import { Repository } from "../domain/post/repository.js";
import { Post } from "../domain/post/entity.js";
import { CreatePostDto } from "../dto/post.js";

import { PostDto } from "../dto/post.js";


export function createService(repository: Repository) {
    return {
        getPosts(category?: string, take?: number): Post[] {
            return repository.getAll(category, take);
        },

        getPost(id: number): Post | undefined {
            return repository.getById(id);
        },

        createPost(post: CreatePostDto): Promise<Post> {
            const newPost: Post = {
                id: Date.now(),
                ...post
            };

            return repository.create(newPost);
        }
    };
}