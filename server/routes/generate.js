const express = require('express');
const router = express.Router();
const { generateImage } = require('../controllers/generateController');

router.post('/generate', generateImage);

module.exports = router;
