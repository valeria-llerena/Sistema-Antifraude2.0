const mysql = require('mysql2');
const Rules = require('../../core/entities/rules');

class RulesRepository {
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

    getAllRules() {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM rule WHERE idrule = 1', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const rules = results.map(row => new Rules(row.idrule, row.minhour, row.maxhour, row.maxamount, row.maxtransaction));
                    console.log(results)
                    resolve(rules);
                }
            });
        });
    }

    actualizarIsFraud(transactionId) {
        return new Promise((resolve, reject) => {
            const sql = `UPDATE transaction SET isfraud = 1 WHERE transactionid = ?`;
    
            this.connection.query(sql, [transactionId], (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    resolve("Campo 'isfraud' actualizado correctamente");
                }
            });
        });
    }
    
}

module.exports = RulesRepository;