import joi from 'joi';

const cardSchema = joi.object({
    employeeId: joi.number().required(),
    isVirtual: joi.boolean().required(),
    isBlocked: joi.boolean().required(),
    type: joi.string().allow('groceries', 'restaurant', 'transport', 'education', 'health').required()
});

export default cardSchema;