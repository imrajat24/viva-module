const express = require("express");
const router = express.Router();
const validate = require("../adapters/validators/routes/Viva");
const database = require("../adapters/databases/Viva");
const errors = require("../adapters/databases/utils/errors");
const service = require("../services/Viva");

router.get("/:courseId", async (req, res) => {
  const { courseId } = req.params;
  try {
    const { error, vivas } = await service.getByCourseId(courseId, database);
    if (error === errors.DB_ERROR_NOT_FOUND) {
      return res.status(404).send(error);
    }
    return res.status(200).send(vivas);
  } catch (exception) {
    console.log(exception);
    return res.status(500).send();
  }
});

router.get("/:courseId/:traineeId", async (req, res) => {
  const { courseId, traineeId } = req.params;
  try {
    const { error, viva } = await service.getByCourseIdTraineeId(
      courseId,
      traineeId,
      database
    );
    if (error === errors.DB_ERROR_NOT_FOUND) {
      return res.status(404).send(error);
    }
    return res.status(200).send(viva);
  } catch (exception) {
    console.log(exception);
    return res.status(500).send();
  }
});
router.post("", async (req, res) => {
  const { error, viva } = validate(req.body);
  if (error) return res.status(400).send(error);
  try {
    const { error, writtenViva } = await service.write(viva, database);
    if (error === errors.DB_ERROR_ALREADY_EXISTS) {
      return res.status(209).send(error);
    }
    return res.status(200).send(writtenViva);
  } catch (exception) {
    console.log(exception);
    return res.status(500).send();
  }
});
router.put("", async (req, res) => {
  const { error, viva } = validate(req.body);
  if (error) return res.status(400).send(error);
  try {
    const { error, oldViva } = await service.update(viva, database);
    if (error === errors.DB_ERROR_NOT_FOUND) {
      return res.status(404).send(error);
    }
    return res.status(200).send(oldViva);
  } catch (exception) {
    console.log(exception);
    return res.status(500).send();
  }
});

module.exports = router;
