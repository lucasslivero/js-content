const express = require('express');
const cors = require('./middlewares/cors');
const errorHandler = require('./middlewares/errorHandler');
require('express-async-errors');

const routes = require('./routes');

const PORT = 3001;
const app = express();
app.use(express.json());
app.use(cors);
app.use(routes);
app.use(errorHandler);

app.listen(PORT, () => console.log(`Server started at http://localhost:${PORT}`));
