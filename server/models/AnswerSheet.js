const Joi = require("joi");

const step = Joi.object({
    description: Joi.string().required(),
    givenMarks: Joi.number().required(),
});
const answer = Joi.object({
    steps: Joi.array().items(step).required(),
    remarks: Joi.string().required(),
});
const answerSheet = Joi.object({
    courseId: Joi.string().required(),
    set: Joi.string().required(),
    answers: Joi.array().items(answer).required(),
});

module.exports = answerSheet;