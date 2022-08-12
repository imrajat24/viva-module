const Joi = require("joi");

const viva = Joi.object({
  courseId: Joi.string().required(),
  // trainerId: Joi.string().required(),
  traineeId: Joi.string().required(),
  status: Joi.number().required().min(0).max(3),
  trainerDate: Joi.number(),
  traineeDate: Joi.number(),
});

const validate = (object) => {
  const { error, value } = viva.validate(object);
  if (error) return { error: error.details[0].message };
  return { viva: value };
};

module.exports = validate;
