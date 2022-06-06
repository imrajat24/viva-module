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

const validate = (object) => {
    const { error, value } = questionPaper.validate(object);
    if (error) return { error: error.details[0].message };
    return { questionPaper: value };
};

module.exports = validate;