const express = require('express');
const gamedig = require('gamedig');

const app = express();
app.use(express.static('public'));
app.listen(process.env.PORT || 5000, () => console.log('App running...'));
app.get('/api', async (req, res) => {
  let err = 0;
  const data = await gamedig.query({
    type: 'samp',
    host: '89.40.4.118',
    port: '7777'
  }).catch(() => err = 1);
  if (err === 1) return res.json({ msg: 'Server is offline...' });
  res.json(data);
});