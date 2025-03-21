const express = require('express');
const mongodb = require('./data/database');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

// Middleware para parse do body
app.use(bodyParser.json());

// Configuração de CORS
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Z-Key");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// Rotas principais
app.use('/', require('./routes'));

// Middleware global de tratamento de erros
app.use((err, req, res, next) => {
    console.error("Error:", err);
    res.status(err.status || 500).json({
        error: "Internal Server Error",
        details: err.message || "Something went wrong",
    });
});

// Inicialização do banco de dados e servidor
mongodb.initDb((err) => {
    if (err) {
        console.error("Database initialization failed:", err);
    } else {
        app.listen(port, () => {
            console.log(`🚀 Server running on port ${port}`);
        });
    }
});
