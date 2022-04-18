import joi from 'joi';

const editCardSchema = joi.object({
    securityCode: joi.string().length(3).required(),
    password: joi.string().length(4).required()
});

export default editCardSchema;