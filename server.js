const express = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

const app = express();

// CORS middleware
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
  next();
});

// Swagger UI options
const options = {
  customCss: '.swagger-ui .topbar { display: none }',
  customSiteTitle: 'SmartHome API Documentation',
  swaggerOptions: {
    url: '/swagger.json'
  }
};

// Serve swagger.json
app.get('/swagger.json', (req, res) => {
  res.json(swaggerDocument);
});

// Serve Swagger UI at root
app.use('/', swaggerUi.serve, swaggerUi.setup(swaggerDocument, options));

// For local development
if (process.env.NODE_ENV !== 'production') {
  const PORT = process.env.PORT || 3002;
  app.listen(PORT, () => {
    console.log(`📚 Swagger Documentation running at http://localhost:${PORT}`);
  });
}

module.exports = app;
