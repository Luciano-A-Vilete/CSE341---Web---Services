const express = require('express');
const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const { options } = require('./routes');
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Z-Key");
    res.setHeader('Access-Control-Allow-Methods', 'get, put, post, delete, options');
    next();
});
app.use('/', require('./routes'));


mongodb.initDb((err) => {
    if (err) {
        console.error(err);
        }
       else { app.listen(port, () => {console.log(`Database is initialized and node is running on port ${port}`)});
    }
})

