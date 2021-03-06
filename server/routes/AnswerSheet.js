const express = require("express");
const router = express.Router();
const validate = require("../adapters/validators/routes/AnswerSheet");
const database = require("../adapters/databases/AnswerSheet");
const errors = require("../adapters/databases/utils/errors");
const service = require("../services/AnswerSheet");

router.get("/:courseId/:traineeId", async (req, res) => {
  const { courseId, traineeId } = req.params;
  try {
    const { error, answerSheet } = await service.getByCourseIdTraineeId(
      courseId,
      traineeId,
      database
    );
    if (error === errors.DB_ERROR_NOT_FOUND) {
      return res.status(404).send(error);
    }
    return res.status(200).send(answerSheet);
  } catch (exception) {
    console.log(exception);
    return res.status(500).send();
  }
});
router.post("", async (req, res) => {
  const { error, answerSheet } = validate(req.body);
  if (error) return res.status(400).send(error);

  try {
    const { error, writtenAnswerSheet } = await service.write(
      answerSheet,
      database
    );
    if (error === errors.DB_ERROR_ALREADY_EXISTS) {
      return res.status(209).send(error);
    }
    return res.status(200).send(writtenAnswerSheet);
  } catch (exception) {
    console.log(exception);
    return res.status(500).send();
  }
});

router.put("", async (req, res) => {
  const { error, answerSheet } = validate(req.body);
  if (error) return res.status(400).send(error);

  try {
    const { error, oldAnswerSheet } = await service.update(
      answerSheet,
      database
    );
    if (error === errors.DB_ERROR_NOT_FOUND) {
      return res.status(209).send(error);
    }
    return res.status(200).send(oldAnswerSheet);
  } catch (exception) {
    console.log(exception);
    return res.status(500).send();
  }
});

module.exports = router;
