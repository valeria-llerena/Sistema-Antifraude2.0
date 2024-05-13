const RulesRepository = require('../../infrastructure/repositories/rulesRepository');
const TransactionRepository = require('../../infrastructure/repositories/transactionRepository');
class reportUseCase {
    constructor() {
        this.transactionRepository = new TransactionRepository();
        this.rulesRepository = new RulesRepository();
    }

    async detectFraudCount() {
        try {
            // Obtener todas las transacciones
            const transactions =  await this.transactionRepository.getAllTransactions();

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
    async printAllTransactions() {
        try {
            // Obtener todas las transacciones
            const transactions = await this.transactionRepository.getAllTransactions();
    
            // Verificar si transactions es un array
            if (!Array.isArray(transactions) || transactions.length === 0) {
                throw new Error('No se encontraron transacciones.');
            }
    
            // Iterar sobre las transacciones e imprimir todos los campos
            console.log(transactions);
    
            // Devolver las transacciones
            return transactions;
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
    async extractHour() {
        try {
            // Obtener todas las transacciones
            const transactions = await this.transactionRepository.getAllTransactions();
    
            // Verificar si transactions es un array y no está vacío
            if (!Array.isArray(transactions) || transactions.length === 0) {
                throw new Error('No se encontraron transacciones.');
            }
    
            // Extraer la hora de cada transacción y guardarla en una lista
            const hours = transactions.map(transaction => {
                // Verificar si transaction.date es un objeto datetime
                if (!(transaction.date instanceof Date)) {
                    throw new Error('El campo date no es un objeto Date válido.');
                }
    
                // Obtener la hora del objeto Date
                const hour = transaction.date.getHours();
                return hour;
            });
    
            // Devolver la lista de horas
            return hours;
        } catch (error) {
            // Manejar errores
            console.error('Error al extraer horas de transacciones:', error);
            throw error;
        }
    }
    
    
}
module.exports = reportUseCase;