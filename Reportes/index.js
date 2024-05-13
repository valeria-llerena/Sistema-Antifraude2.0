const express = require('express');
const cors = require('cors'); // Requerir el paquete CORS
const app = express();

// Middlewares básicos
app.use(express.json()); // Para parsear JSON
app.use(cors()); // Habilitar CORS para todas las rutas

// Rutas
const fraudRoutes = require('./src/interfaces/routes/fraudRoutes');
app.use('/api', fraudRoutes); // Usar las rutas de detección de fraude en el endpoint '/api'
const rulesRoutes = require('./src/interfaces/routes/rulesRoutes');
app.use('/api', rulesRoutes )
const alertRoutes = require('./src/interfaces/routes/alertRoutes');
app.use('/api', alertRoutes )
const reportRoutes= require('./src/interfaces/routes/reportRoutes');
app.use('/api', reportRoutes )

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});