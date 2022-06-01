const Joi = require("joi");

const step = Joi.object({
    description: Joi.string().required(),
    totalMarks: Joi.number().required(),
});
const question = Joi.object({
    questionStatement: Joi.string().required(),
    steps: Joi.array().items(step).required(),
});
const questionPaper = Joi.object({
    courseId: Joi.string().required(),
    set: Joi.string().required(),
    questions: Joi.array().items(question).required(),
});

module.exports = questionPaper;