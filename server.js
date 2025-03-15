const express = require('express');
const mongodb = require('./data/database');
const bodyParser = require('body-parser');
const app = express();

const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use('/', require('./routes'));


mongodb.initDb((err) => {
    if (err) {
        console.error(err);
        }
       else { app.listen(port, () => {console.log(`Database is initialized and node is running on port ${port}`)});
    }
})

