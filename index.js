const express = require("express");

const app = express();

app.use(express.json());

const PORT = 3000;
const HOST = "localhost";

const products = [
    { id: 1, name: "iPhone 15", price: 999, category: "electronics" },
    { id: 2, name: "TV", price: 700, category: "electronics" },
    { id: 3, name: "Office Chair", price: 150, category: "furniture" },
    { id: 4, name: "monitor", price: 200, category: "electronics" },
    { id: 5, name: "Desk", price: 100, category: "furniture" }
];

function addProduct(newProduct, fail = false) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (fail) {
                reject(new Error("Помилка збереження"));
                return;
            }

            products.push(newProduct);
            resolve(newProduct);
        }, 500);
    });
}


app.get("/timestamp", (req, res) => {
    res.json({
        timestamp: new Date()
    });
});

app.get("/health", (req, res) => {
    res.json({
        status: "ok"
    });
});

app.get("/stats", (req, res) => {
    res.json({
        uptime: Math.floor(process.uptime()),
        nodeVersion: process.version,
        timestamp: new Date()
    });
});

app.get("/products", (req, res) => {
    const { take, category } = req.query;

    let result = products;

    if (category) {
        result = products.filter(product => product.category === category);
    }

    if (take && !isNaN(take)) {
        result = result.slice(0, Number(take));
    }

    res.status(200).json(result);
});

app.get("/products/:id", (req, res) => {
    const id = Number(req.params.id);

    const product = products.find(product => product.id === id);

    if (!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json(product);
});

app.post('/products', async (req, res) => {
    const { name, price, category, image = '' } = req.body;

    if (
        !name ||
        typeof name !== 'string' ||
        !name.trim() ||
        typeof price !== 'number' ||
        price <= 0 ||
        !category ||
        typeof category !== 'string' ||
        !category.trim()
    ) {
        return res.status(422).json({
            message: "Invalid product data"
        });
    }

    const existingProduct = products.find(
        product => product.name === name
    );

    if (existingProduct) {
        return res.status(409).json({
            message: "Product already exists"
        });
    }

    const newProduct = {
        id: products.length
            ? Math.max(...products.map(product => product.id)) + 1
            : 1,
        name: name.trim(),
        price,
        category: category.trim(),
        image
    };

    try {
        const fail = req.query.fail === 'true';

        const product = await addProduct(newProduct, fail);

        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({
            message: error.message
        });
    }
});



app.listen(PORT, () => {
    console.log(`Server started: http://${HOST}:${PORT}`);
});