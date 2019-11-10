const express = require('express');

const app = express();
const port = process.env.port || 5000;

app.use(express.json({ extended: false }));

app.get('/', (req, res) => res.send('Hello world!'));
app.use('/api/search', require('./api/search'));
app.use('/api/profile', require('./api/getProfileAndCharacters'));
app.use('/api/stats', require('./api/getProfileOrCharacterStats'));

app.listen(port, () => console.log(`Server started on port ${port}`));
