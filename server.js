const express = require('express');
const app = express();

app.use('/', require('./routes'));

app.get('/lais', lesson1Controller.laisRoute);

app.get('/vilete', lesson1Controller.vileteRoute);

const port = 3000;
app.listen(process.env.port || port);
