const express = require('express');
const mongoose = require('mongoose');
const routes = require('./routes');
const cors = require('cors');
const http = require('http');
const {setupWebSocket} =  require('./websocket');

const app = express();
const server = http.Server(app);

mongoose.connect('mongodb+srv://felipeSima:KaizokuniOreWaNaru26071611@cluster0-9y4nj.mongodb.net/week10?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
});

app.use(cors());
app.use(express.json());
app.use(routes);

server.listen(3333);
