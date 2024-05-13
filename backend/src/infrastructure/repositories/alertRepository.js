const mysql = require('mysql2');
const Rules = require('../../core/entities/alert');

class AlertRepository {
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

    getAllAlert() {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM alert', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const ips = results.map(row => new Alert(row.idalert, row.idtransaction,row.idRule,row.action,row.idUser));
                    console.log(results)
                    resolve(ips);
                }
            });
        });
    }
}

module.exports = AlertRepository;