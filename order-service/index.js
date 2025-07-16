// order-service/index.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('Order Service Running!');
});

app.listen(3001, () => {
  console.log('Order service listening on port 3001');
});
