require('dotenv').config();
const express = require('express');
const http = require("http");
const cors = require("cors");
var cookies = require("cookie-parser");
const bodyParser = require('body-parser');
const { default: mongoose } = require('mongoose')

const routes = require('./src/routers/index')

const app = express();
const server = http.createServer(app);
const port = process.env.PORT || 3000;
const hostname = process.env.HOST_NAME || 'localhost';


// config cors
app.use(
    cors({
        credentials: true,
        allowedHeaders: "Content-Type,Authorization",
        origin: process.env.CLIENT_URL ?? "http://localhost:3000",
    })
);
app.use(cookies());


app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));

// Parse URL-encoded form data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// config routes
routes(app);

// connect to MongoDB
mongoose.connect(`mongodb+srv://nhanntse172587:${process.env.MONGO_DB}@cluster0.nvzg8pw.mongodb.net/?retryWrites=true&w=majority`)
    .then(() => {
        console.log('Connect Db success')
    })
    .catch((err) => {
        console.log(err)
    })

server.listen(port, hostname, () => {
    console.log(`Example app listening on http://${hostname}:${port}`);
});
