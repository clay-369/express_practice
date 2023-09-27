const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/Users'); // Import the user routes
const port = 3000;

app.use(bodyParser.json());

// Mount the user routes
app.use('/', userRoutes);

app.listen(port, () => {
  console.log('Listening on port: ' + port);
});
