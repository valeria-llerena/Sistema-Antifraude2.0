const express = require('express');
const reportUseCase = require('../../core/usecases/reportUseCase');
const router = express.Router();

router.get('/report', async (req, res) => {
    const Report = new reportUseCase();
    try {
        // Obtener las horas y los datos de fraude
        const hours = await Report.extractHour();
        const fraudData = await Report.detectFraudCount();

        // Crear un objeto JSON que contenga ambos conjuntos de datos
        const combinedData = { hours, fraudData };

        // Enviar la respuesta JSON con ambos conjuntos de datos
        res.json(combinedData);
    } catch (error) {
        res.status(500).send(error.toString());
    }
});


module.exports = router;
