import { PostDto } from "../dto/post.js";
import { Post } from "../domain/post/entity.js";
import { Repository } from "../domain/post/repository.js";


const posts: PostDto[] = [
    {
        id: 1,
        title: "JavaScript",
        content: "Изучаем JavaScript",
        author: "Vadim",
        category: "programming"
    },
    {
        id: 2,
        title: "Node.js",
        content: "Изучаем Node.js",
        author: "Alex",
        category: "programming"
    },
    {
        id: 3,
        title: "Gaming",    
        content: "Люблю компьютерные игры",
        author: "Max",
        category: "games"
    }
];

export function createRepository(): Repository {
    return {
        getAll(category?: string, take?: number): Post[] {
            let result = posts;

            if (category) {
                result = result.filter(post => post.category === category);
            }

            if (take) {
                result = result.slice(0, take);
            }

            return result;
        },

        getById(id: number): Post | undefined {
            return posts.find(post => post.id === id);
        },

        create(post: Post): Promise<Post> {
            return new Promise((resolve) => {
                setTimeout(() => {
                    posts.push(post);
                    resolve(post);
                }, 300);
            });
        }
    };
}
