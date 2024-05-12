class Alert {
    constructor(idAlert, idTransaction, idUser, idRule, action) {
        this.idAlert = idAlert; 
        this.idTransaction = idTransaction; 
        this.idUser = idUser; 
        this.idRule = idRule; 
        this.action = action; 
    }
}
module.exports = Alert; 