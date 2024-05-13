const express = require('express');
const FraudDetectionUseCase = require('../../core/usecases/alertShowUseCase');
const router = express.Router();

router.get('/show-alert', async (req, res) => {
    const alertShow = new alertShowUseCase();
    try {
        const results = await alertShow.detectFraud();
        res.json(results);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

module.exports = router;