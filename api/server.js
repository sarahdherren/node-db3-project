const express = require('express');

const SchemeRouter = require('./schemes/scheme-router.js');

const server = express();

server.use(express.json());
server.use('/api/schemes', SchemeRouter);

server.use((err, req, res, next) => { //eslint-disable-line
    res.status(err.status || 500).json({
        message: err.message
    });
});

server.get('/', (req, res) => {
    res.send(`<h1>Schemes and Plots</h1>`);
});

module.exports = server;