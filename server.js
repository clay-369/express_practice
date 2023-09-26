const express = require('express');
const app = express();
const port = 3000;  // Change port to 3000 or another available port



app.listen(port, () => {
    console.log('listening on port: ' + port)
})
