
const express = require('express');
const app = express();
const lesson1Controller = require('./controllers/lesson1');

app.get('/', (req, res) => {
    res.send('Hello, Express.js server!');
});

app.get('/lais', lesson1Controller.laisRoute);

app.get('/vilete', lesson1Controller.vileteRoute);

const port1 = 3000;
app.listen(port1, () => {
    console.log(`Server running at http://localhost:${port1}/`);
});
