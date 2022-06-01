const Joi = require("joi");

const viva = Joi.object({
    courseId: Joi.string().required(),
    trainerId: Joi.string().required(),
    traineeId: Joi.string().required(),
    created: Joi.number().required(),
    status: Joi.number().required().min(0).max(2),
});

module.exports = viva;