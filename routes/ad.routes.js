const express = require('express');
const router = express.Router();
const AdController = require('../controllers/ads.controller');
const authMiddleware = require('../utils/authMiddleware')

router.get('/ads', AdController.getAll);

router.get('/ads:id', AdController.getById);

router.post('/ads', authMiddleware, AdController.addAd);

router.put('/ads/:id', authMiddleware, AdController.editAd);

router.delete('/ads:id', authMiddleware, AdController.delete);

router.get('/ads/search/:searchPhrase');

module.exports = router