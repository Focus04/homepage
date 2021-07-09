const express = require('express');
const gamedig = require('gamedig');

const app = express();
app.use(express.static('public'));
app.listen(5000, () => console.log('App running...'));
app.get('/api', async (req, res) => {
  const data = await gamedig.query({
    type: 'samp',
    host: '89.40.4.118',
    port: '7777'
  });
  res.json(data);
});