const express = require('express');
const path = require('path');
const cookiesMiddleware = require('universal-cookie-express');

const app = express();
app.use(cookiesMiddleware());

app.use(express.json({ extended: false }));

app.use('/api/search', require('./api/search'));
app.use('/api/profile', require('./api/getProfileAndCharacters'));
app.use('/api/stats', require('./api/getProfileOrCharacterStats'));
app.use('/api/oauth', require('./api/getOAuth'));

// Production assets
if (process.env.NODE_ENV === 'production') {
  app.use(express.static('client/build'));
  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
  });
}

// Port
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
