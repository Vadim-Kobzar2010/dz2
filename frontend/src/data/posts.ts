import type { Post } from "../types/Post.ts";

export const posts: Post[] = [
    {
        id: "1",
        title: 'Погода',
        content: 'Сегодня в Днепре пасмурно, лучше остаться дома',
        category: 'Weather',
        author: 'Alex',
        createdAt: '14 октября 2026',
    },

    {
       id: "2",
       title: "Одежда",
       content: "Где купить хорошую одужду?",
       category: "Clothes",
       author: "David",
       createdAt: "12 октября 2026",
    },

    {
        id: "3",
        title: "Парк",
        content: "Какой парк лучше посетить?",
        category: "Parks",
        author: "Max",
        createdAt: "10 октября 2026",
    },
];