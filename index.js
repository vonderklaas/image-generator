require('dotenv').config();

const path = require('path');
const express = require('express');
const PORT = process.env.PORT || 5000;

const app = express();

// Enable body parsing
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Static folder (our front-end)
app.use(express.static(path.join(__dirname, 'public')));

app.use('/openai', require('./routes/openaiRoutes'));

app.listen(PORT, () => {
  console.log(`Server started on port: ${PORT}`);
});
