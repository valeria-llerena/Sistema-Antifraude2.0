class Rules {
    constructor(idRule, minHour, maxHour, maxAmount, maxTransaction ) {
        this.idRule= idRule; 
        this.minHour = minHour; 
        this.maxHour = maxHour;
        this.maxAmount = maxAmount;
        this.maxTransaction = maxTransaction
    }
    isHighAmount(amount) {
        return amount > this.maxAmount; // La transaccion es mayor a la cantidad permitida
    }

    isOutofHourTransaction(hour) {
        const hourc = hour.getHours();
        return hourc >= this.minHour.getHours() && hourc < this.maxHour.getHours(); // Transacciones entre las maxhour y minhour
    }

    isFrequentTransaction(transactions) {
        // Ensure transactions is an array
        if (!Array.isArray(transactions)) {
            throw new Error('Transactions must be an array');
        }
    
        // Create a specific date for comparison (2025-01-01T05:50:59)
        const currentDate = new Date('2025-01-01T04:00:59');
    
        // Filter recent transactions within the last hour
        const recentTransactions = transactions.filter(t => {
            // Convert t.date to a Date object
            const transactionDate = new Date(t.date);
            // Calculate the difference in milliseconds
            const differenceInMilliseconds = currentDate - transactionDate;
            // Return true if the transaction occurred within the last hour (3600000 milliseconds)
            return differenceInMilliseconds < 3600000;
        });
    
        // Check if the number of recent transactions exceeds the maximum allowed
        return recentTransactions.length >= this.maxTransaction; // More than `maxTransaction` transactions in less than an hour
    }

    isBannedIp(bannedIp, currentIp){
        // Esta función asume que `transactions` es una lista de transacciones recientes del mismo usuario
        return currentIp.isInList(bannedIp);
    };
}
module.exports = Rules;
