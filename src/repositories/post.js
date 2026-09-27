const posts = [
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

export function getAll(category, take) {
    let result = posts;

    if (category) {
        result = result.filter(post => post.category === category);
    }

    if (take) {
        result = result.slice(0, Number(take));
    }

    return result;
}

export function getById(id) {
    return posts.find(post => post.id === Number(id));
}

export function addPost(post) {
    return new Promise((resolve) => {
        setTimeout(() => {
            posts.push(post);
            resolve(post);
        }, 300);
    });
}