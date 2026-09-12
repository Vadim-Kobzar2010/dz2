const express = require("express");

const app = express();

const PORT = 3000;
const HOST = "localhost";

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

app.listen(PORT, () => {
    console.log(`Server started: http://${HOST}:${PORT}`);
});