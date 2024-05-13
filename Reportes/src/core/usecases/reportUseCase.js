const RulesRepository = require('../infrastructure/repositories/rulesRepository');
const TransactionRepository = require('../../infrastructure/repositories/transactionRepository');
class reportUseCase {
    constructor() {
        this.transactionRepository = new TransactionRepository();
        this.rulesRepository = new RulesRepository();
    }

     detectFraudCount() {
        try {
            // Obtener todas las transacciones
            const transactions =  this.transactionRepository.getAllTransactions();

            // Contadores para fraudes y no fraudes
            let fraudCount = 0;
            let nonFraudCount = 0;

            // Iterar sobre las transacciones y contar
            transactions.forEach(transaction => {
                if (transaction.isFraud === 0) {
                    fraudCount++;
                } else if (transaction.isFraud === 1) {
                    nonFraudCount++;
                }
            });

            // Devolver los resultados
            return { fraudCount, nonFraudCount };
        } catch (error) {
            // Manejar errores
            console.error('Error al detectar fraudes:', error);
            throw error;
        }
    }
     printAllTransactions() {
        try {
            // Obtener todas las transacciones
            const transactions =  this.transactionRepository.getAllTransactions();

            // Iterar sobre las transacciones e imprimir todos los campos
            return {transactions}

        } catch (error) {
            // Manejar errores
            console.error('Error al imprimir transacciones:', error);
            throw error;
        }
    }
    printAllRules(){
        try {
            // Obtener todas las transacciones
            const rules=this.rulesRepository.getAllRules();

            // Iterar sobre las transacciones e imprimir todos los campos
            return {rules}

        } catch (error) {
            // Manejar errores
            console.error('Error al imprimir transacciones:', error);
            throw error;
        }

    }
    extractHoursFromTransactions() {
        try {
            // Obtener todas las transacciones
            const transactions = this.transactionRepository.getAllTransactions();
    
            // Array para almacenar todas las horas
            const hours = [];
    
            // Iterar sobre las transacciones y extraer las horas
            transactions.forEach(transaction => {
                // Obtener la hora de la fecha de la transacción
                const transactionDate = new Date(transaction.date);
                const hour = transactionDate.getHours();
    
                // Agregar la hora al array
                hours.push(hour);
            });
    
            // Devolver todas las horas
            return hours;
        } catch (error) {
            // Manejar errores
            console.error('Error al extraer horas de transacciones:', error);
            throw error;
        }
    }
    
}
module.exports = reportUseCase;