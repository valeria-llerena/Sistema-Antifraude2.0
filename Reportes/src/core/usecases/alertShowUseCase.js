const AlertRepository = require('../../infrastructure/repositories/alertRepository');
const UserRepository = require('../../infrastructure/repositories/userRepository');

const RulesRepository = require('../../core/usecases/rulesConfigUseCase')

const Rules = require('../../core/entities/rules')
class FraudDetectionUseCase {
    constructor() {
        this.transactionRepository = new AlertRepository();
        this.rulesRepository = new RulesRepository(); 
        this.UserRepository = new UserRepository();
    }
    async detectarFraudeYAlertar(transactionId) {
        try {
            // Obtener la transacción
            const transaccion = await this.transactionRepository.obtenerTransaccionPorId(transactionId);

            // Obtener el usuario asociado a la transacción
            const usuario = await this.userRepository.obtenerUsuarioPorId(transaccion.userId);
            
            // Verificar si el monto de la transacción excede el límite permitido
            const reglas = await this.rulesRepository.getAllRules(); // Obtener todas las reglas
            const montoMaximo = reglas[0].maxamount; // Supongo que la primera regla contiene el límite de monto máximo permitido
            
            if (transaccion.amount > montoMaximo) {
                // En lugar de mostrar un mensaje, devolver un objeto con la información
                return {
                    alerta: 'ALERTA: Monto excedido',
                    usuario: usuario.nombres,
                    montoTransaccion: transaccion.amount
                };
            } else {
                // Si no se excede el límite, devolver null
                return null;
            }
        } catch (error) {
            console.error('Error al detectar fraude y alertar:', error);
            // En caso de error, devolver un objeto con el error
            return {
                error: error.message
            };
        }
    }


}