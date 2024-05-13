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
        if (!Array.isArray(transactions)) {
            throw new Error('Transactions must be an array');
        }
    
        // CURRENT DATE
        const currentDate = new Date('2025-01-01T04:00:59');
    

        const recentTransactions = transactions.filter(t => {
       
            const transactionDate = new Date(t.date);
          
            const differenceInMilliseconds = currentDate - transactionDate;
         
            return differenceInMilliseconds < 3600000;
        });
    

        return recentTransactions.length >= this.maxTransaction; 
    }

    isBannedIp(bannedIp, currentIp){

        return currentIp.isInList(bannedIp);
    };
}
module.exports = Rules;
