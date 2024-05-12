class Transaction {
    constructor(transactionId, userid, amount, date, ip, isFraud) {
        this.transactionId = transactionId;
        this.userid = userid; 
        this.amount = amount;
        this.date = date;
        this.ip = ip;
        this.isFraud = isFraud;
    }
}

module.exports = Transaction;

