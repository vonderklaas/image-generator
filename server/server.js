require('dotenv').config();

const path = require('path');
const express = require('express');
const cors = require('cors');
const PORT = process.env.PORT || 5000;

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static Files
app.use('/', express.static(path.join(__dirname, 'public')));

// Routes
app.use('/', require('./routes/root'));
app.use('/openai', require('./routes/generate'));

app.all('*', (req, res) => {
  res.status(404);
  // Determine type of response
  if (req.accepts('html')) {
    res.sendFile(path.join(__dirname, 'views', '404.html'));
  } else if (req.accepts('json')) {
    res.json({
      message: "404 - The resource you have requested doesn't exist.",
    });
  } else {
    res
      .type('txt')
      .send("404 - The resource you have requested doesn't exist.");
  }
});

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
  if (process.env.NODE_ENV === 'development') {
    console.log('REST API ->', `http://localhost:${PORT}/`);
  }
});
