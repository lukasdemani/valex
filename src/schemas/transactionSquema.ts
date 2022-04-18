import joi from 'joi';

const transactionSchema = joi.object({
    businessId: joi.number().required(),
    amount: joi.number().greater(0).required()
    
});

export default transactionSchema;