const mysql = require('mysql2');
const Transaction = require('../../core/entities/transaction');

class TransactionRepository {
    constructor() {
        this.connection = mysql.createConnection({
            host: 'localhost',
            user: 'root',
            password: '@87d8rOg7MU3',
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
}

module.exports = TransactionRepository;