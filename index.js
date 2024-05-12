const express = require('express');
const cors = require('cors'); // Requerir el paquete CORS
const app = express();

// Middlewares básicos
app.use(express.json()); // Para parsear JSON
app.use(cors()); // Habilitar CORS para todas las rutas

// Rutas
const fraudRoutes = require('./backend/src/interfaces/routes/fraudRoutes');
app.use('/api', fraudRoutes); // Usar las rutas de detección de fraude en el endpoint '/api'
const rulesRoutes = require('../Sistema-Antifraude2.0/backend/src/interfaces/routes/rulesRoutes');
app.use('/api', rulesRoutes )

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});