const express = require('express');
const path = require('path');
const swaggerDocument = require('./swagger.json');

const app = express();

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Serve swagger.json API
app.get('/api/swagger.json', (req, res) => {
  res.json(swaggerDocument);
});

// Serve static files from public folder
app.use(express.static(path.join(__dirname, 'public')));

// Serve index.html for root
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3002;
  app.listen(PORT, () => {
    console.log(`📚 Swagger Documentation running at http://localhost:${PORT}`);
  });
}

module.exports = app;
