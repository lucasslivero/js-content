const express = require('express');
require('express-async-errors');

const routes = require('./routes');

const app = express();
app.use(express.json());
app.use((request, response, next) => {
  response.setHeader('Access-Control-Allow-Origin', '*');
  next();
});
app.use(routes);
app.use((error, request, response, next) => {
  console.log(error);
  response.sendStatus(500);
});

app.listen(3002, () => console.log('Server started at http://localhost:3002'));
