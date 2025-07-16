// index.js
const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

app.get('/', (req, res) => {
  res.send('User Service Running!');
});

app.listen(3000, () => {
  console.log('User service listening on port 3000');
});
