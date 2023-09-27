const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const userRoutes = require('./routes/Users'); // Correct path to user routes
const animalRoutes = require('./routes/Animals'); // Correct path to animal routes
const port = 3000;

app.use(bodyParser.json());

// Mount the user routes
app.use('/api/users', userRoutes);
app.use('/api/animals', animalRoutes);


app.listen(port, () => {
  console.log('Listening on port: ' + port);
});
