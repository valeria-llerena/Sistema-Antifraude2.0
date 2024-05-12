// Importa el caso de uso
const FraudDetectionUseCase = require('./backend/src/core/usecases/fraudDetectionUseCase');

// Función asíncrona para ejecutar la detección de fraude
async function testFraudDetection() {
    // Crea una instancia del caso de uso
    const fraudDetection = new FraudDetectionUseCase();

    // Llama al método para detectar fraude y guarda los resultados
    const results = await fraudDetection.detectFraud();

    // Imprime los resultados para revisión
    console.log("Resultados de la Detección de Fraude:");
    console.log("Transacciones de Alto Monto:", results.highAmounts);
    console.log("Transacciones Nocturnas:", results.lateNightTransactions);
    console.log("Transacciones Frecuentes:", results.frequentTransactions);
}

// Ejecuta la función de prueba
testFraudDetection();
