// product-service/index.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Product Service Running!');
});

app.listen(3002, () => {
  console.log('Product service listening on port 3002');
});
