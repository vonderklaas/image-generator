const path = require('path');
const express = require('express');
const router = express.Router();

// ^ - At the beginning of the string only
// $ - At the end of the string only
// | - Logical OR
// (.html)? - Optional extension
router.get('^/$|/index(.html)?', (req, res) => {
  res.sendFile(path.join(__dirname, '..', 'views', 'index.html'));
});

module.exports = router;
