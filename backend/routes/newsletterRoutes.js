const express = require('express');
const router = express.Router();
const newsletterControl = require('../controllers/newsletterControl');
const mongoose = require('mongoose');
const cors = require('cors');

router.use(cors());


router.post('/api/newsletter/create', newsletterControl.create);
router.get('/api/newsletter/retrieve', newsletterControl.retrieve);
router.get('/api/newsletter/:_id', newsletterControl.get);
router.put('/api/newsletter/:_id', newsletterControl.update);
router.delete('/api/newsletter/:_id', newsletterControl.delete);

module.exports = router;