const express = require('express');
const {connectDB} =  require("./mongo/connection");
const cors = require('cors');
const app = express();
const router = require("./routers/router.js")
app.use(cors());
app.use(express.json());
app.use('/', router);

connectDB().then(() => console.log("Connected to database!"))

const server = app.listen(3001, () => {
    console.log('Server is up and running ⚡')
});