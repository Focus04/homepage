const express = require('express');
const gamedig = require('gamedig');

const app = express();
app.use(express.static('public'));
app.listen(3001, () => console.log('API started...'));
app.get('/api', async (req, res) => {
  let err = 0;
  const data = await gamedig.query({
    type: 'samp',
    host: '135.125.128.240', 
    port: '7777'
  }).catch(() => err = 1);
  if (err === 1) return res.json({ msg: 'Server is offline...' });
  res.json(data);
});