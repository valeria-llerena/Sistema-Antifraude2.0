const mysql = require('mysql2');
const Transaction = require('../../core/entities/transaction');

class TransactionRepository {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: 'Forevercfr',
            database: 'sistemaantifraude'
        });
        this.connection.connect(error => {
            if (error) throw error;
            console.log('Successfully connected to the database.');
        });
    }

    getAllTransactions() {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM transactions', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const transactions = results.map(row => new Transaction(row.transactionId, row.userid,  row.amount, row.date, row.ip, row.isfraud));
                    resolve(transactions);
                }
            });
        });
    }

    setFraud(){
        return new Promise((resolve, reject) => {
            this.connection.query('UPDATE transaction SET isfraude=0 where ', [newRule.minHour,
                 newRule.maxHour, newRule.maxAmount, newRule.maxTransaction], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve("OK");
                }
            });
        });
    }
}


module.exports = TransactionRepository;