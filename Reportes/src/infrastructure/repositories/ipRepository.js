const mysql = require('mysql2');
const Ip = require('../../core/entities/ip');

class IpRepository {
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

    getAllIp() {
        return new Promise((resolve, reject) => {
            this.connection.query('SELECT * FROM ip', (error, results) => {
                if (error) {
                    reject(error);
                } else {
                    const ips = results.map(row => new Ip(row.idIp, row.ip));
                    console.log(results)
                    resolve(ips);
                }
            });
        });
    }
}

module.exports = IpRepository;