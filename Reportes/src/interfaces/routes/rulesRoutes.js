const express = require('express');
const rulesConfigUseCase = require('../core/usecases/rulesConfigUseCase');
const router = express.Router();


router.get('/rules', async(req, res)=>{
    const currentRules = new rulesConfigUseCase(); 
    try{
        const results = await currentRules.getCurrentRules(); 
        res.json(results);
    } catch(error) {
        res.status(500).send(error.toString()); 
    }
}); 
router.post('/rules', async (req, res) => {
    const currentRules = new rulesConfigUseCase();
    const newRule = {

        minHour : req.body.minHour, 
        maxHour : req.body.maxHour,
        maxAmount: req.body.maxAmount, 
        maxTransaction : req.body.maxTransaction,

    };
    try {
        await currentRules.setNewRules(newRule);
        res.json({ message: 'Rules updated successfully' });
    } catch (error) {
        res.status(500).send(error.toString());
    }
});

module.exports = router;