const express = require("express");

const app = express();

const PORT = 3000;
const HOST = "localhost";

const products = [
    { id: 1, name: "iPhone 15", price: 999, category: "electronics" },
    { id: 2, name: "TV", price: 700, category: "electronics" },
    { id: 3, name: "Office Chair", price: 150, category: "furniture" },
    { id: 4, name: "monitor", price: 200, category: "electronics" },
    { id: 5, name: "Desk", price: 100, category: "furniture" }
];


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


app.listen(PORT, () => {
    console.log(`Server started: http://${HOST}:${PORT}`);
});