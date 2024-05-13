class Transaction {
    constructor(transactionId, userid, amount, date, ip, isFraud) {
        this.transactionId = transactionId;
        this.userid = userid; 
        this.amount = amount;
        this.date = date;
        this.ip = ip;
        this.isFraud = isFraud;
    }

    actualizarIsFraud() {
        // Consulta SQL para actualizar 'isFraud' a 1 para esta transacción
        const sql = `UPDATE transaction SET isfraud = 1 WHERE transactionid = ${this.transactionId}`;
        
        // Aquí debes ejecutar la consulta SQL utilizando el cliente MySQL
        
        // Por ejemplo:
        // connection.query(sql, (error, results, fields) => {
        //     if (error) {
        //         console.error('Error al actualizar el campo "isfraud":', error);
        //         return;
        //     }
        //     console.log('Campo "isfraud" actualizado correctamente');
        // });
        
        // Aquí deberías manejar la ejecución de la consulta SQL utilizando el cliente MySQL
        // Esto dependerá de cómo estás manejando las conexiones y consultas a la base de datos en tu aplicación
        // Debes asegurarte de que la conexión esté establecida antes de ejecutar esta consulta
        // Y que la clase Transaction tenga acceso a la instancia de la conexión MySQL
        
        // Este código es solo un esqueleto para ilustrar cómo podrías implementar este método en la clase Transaction
    }


    
}




module.exports = Transaction;

