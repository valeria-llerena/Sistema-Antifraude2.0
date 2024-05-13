const express = require('express');
const reportUseCase = require('../../core/usecases/reportUseCase');
const router = express.Router();

router.get('/report', async (req, res) => {
    const Report = new reportUseCase();
    try {
        const results =  Report.printAllRules();
        res.json(results);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

module.exports = router;