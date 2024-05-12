const express = require('express');
const FraudDetectionUseCase = require('../../core/usecases/fraudDetectionUseCase');
const router = express.Router();

router.get('/detect-fraud', async (req, res) => {
    const fraudDetection = new FraudDetectionUseCase();
    try {
        const results = await fraudDetection.detectFraud();
        res.json(results);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

module.exports = router;