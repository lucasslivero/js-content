const express = require('express');
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/errorHandler');
require('express-async-errors');

const routes = require('./routes');

const app = express();
app.use(express.json());
app.use(cors);
app.use(routes);
app.use(errorHandler);

app.listen(3002, () => console.log('Server started at http://localhost:3002'));
