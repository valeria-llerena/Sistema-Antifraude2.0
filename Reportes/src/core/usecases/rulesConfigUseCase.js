const RulesRepository = require('../../infrastructure/repositories/rulesRepository');
const IpRepository = require('../../infrastructure/repositories/ipRepository');
const Rules = require('../entities/rules');

class rulesConfigUseCase {
    constructor() {
        this.rulesRepository = new RulesRepository();
        this.ipRepository = new IpRepository(); 
    }

    async getCurrentRules(){ 
        const rules = await this.rulesRepository.getAllRules();
        const bannedIp = await this.ipRepository.getAllIp();
        const currentRules = {rules, bannedIp };
        return currentRules ; 

    }

    async setNewRules(newRule, newips) {
        const rulesIp = await this.getCurrentRules();
        const rule = rulesIp.rules[0];
        if (newRule.minHour !== undefined) {
            rule.minHour = newRule.minHour;
        }
        if (newRule.maxHour !== undefined) {
            rule.maxHour = newRule.maxHour;
        }
        if (newRule.maxAmount !== undefined) {
            rule.maxAmount = newRule.maxAmount;
        }
        if (newRule.maxTransaction !== undefined) {
            rule.maxTransaction = newRule.maxTransaction;
        }
        await this.rulesRepository.setRules(rule);


    }
    

}

module.exports = rulesConfigUseCase;