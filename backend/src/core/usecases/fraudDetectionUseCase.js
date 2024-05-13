const TransactionRepository = require('../../infrastructure/repositories/transactionRepository');
const RulesRepository = require('../../core/usecases/rulesConfigUseCase')
const AlertShowUseCase=require('../../core/usecases/alertShowUseCase');
const Rules = require('../../core/entities/rules');
const AlertRepository = require('../../infrastructure/repositories/alertRepository');
class FraudDetectionUseCase {
    constructor() {
        this.transactionRepository = new TransactionRepository();
        this.rulesRepository = new RulesRepository();
        this.alertRepository = new AlertRepository();

    }
    async detectFraud() {
        const transactions = await this.transactionRepository.getAllTransactions();
        const currentRules = await this.rulesRepository.getCurrentRules(); 
        const rules1 = currentRules.rules[0]; 
        const rules = new Rules(1, rules1.minHour, rules1.maxHour, rules1.maxAmount, rules1.maxTransaction);
        const bannedIps = currentRules.bannedIp; 
        const classifiedTransactions = transactions.map(transaction => {
            let alert, alert2, alert3, alert4= '';  // Default is a normal transaction
            
            const userTransactions = transactions.filter(t => t.userId === transaction.userId);
            if (rules.isHighAmount(transaction.amount)) {
                alert = 'CREATE ALERT HIGH AMOUNT';
            } 
            if (rules.isOutofHourTransaction(transaction.date)) {
                alert2 = 'CREATE ALERT OUT OF HOUR';
            }
            if (rules.isFrequentTransaction(userTransactions)) {
                alert3 = 'CREATE ALERT FREQUENT TRANSACTION';
            }
            if(bannedIps.some(i => i.Ip === transaction.ip)){
                alert4= 'CREATE ALERT BANNED IP'; 
            }
            return { ...transaction, alert , alert2, alert3, alert4};
        });
    
        return classifiedTransactions;
    }
    
}

module.exports = FraudDetectionUseCase;