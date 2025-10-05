const express = require('express');
const { connectDB } = require('./mongo/connection');
const cors = require('cors');
const app = express();
const router = require('./routers/router');

app.use(
  cors({
    origin: 'https://computech-store.netlify.app',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  })
);

app.options('*', cors());

app.use(express.json());

app.use('/', router);

connectDB().then(() => console.log('Connected to database!'));

const port = process.env.PORT || 3001;

const server = app.listen(port, () => {
  console.log('Server is up and running ⚡');
});

module.exports = { app, server };
