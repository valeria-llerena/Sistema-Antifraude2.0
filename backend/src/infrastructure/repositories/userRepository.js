const mysql = require('mysql2');
const Transaction = require('../../core/entities/user');

class UserRepository {
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
            this.connection.query('SELECT * FROM user', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const transactions = results.map(row => new Transaction(row.iduser, row.isempresa,  row.nombres, row.correo, row.telefono));
                    resolve(transactions);
                }
            });
        });
    }
}

module.exports = UserRepository;