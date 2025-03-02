const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200, {'Content-Type': 'text/plain'});
    res.end('Hello, Node.js server!');
});

const port = 3000;
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}/`);
});



//const express = require('express');
//const app = express();

//app.get('/', (req, res) => {
//    res.send('Hello, Express.js server!');
//});

//const port1 = 3000;
//app.listen(port1, () => {
//    console.log(`Server running at http://localhost:${port1}/`);
//});
