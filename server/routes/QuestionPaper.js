const express = require("express");
const questionPaperModel = require("../models/QuestionPaper");
const router = express.Router();
const service = require("../services/QuestionPaper");
const database = require("../adapters/database/QuestionPaper");

//
router.get("/:courseId", async (req, res) => {
  const courseId = req.params.courseId;
  try {
    const questionPapers = await service.getByCourseId(courseId, database);
    res.send(questionPapers);
  } catch (error) {
    res.status(500).send({
      error: true,
      message: toString(error),
    });
  }
});

//
router.delete("/:courseId", async (req, res) => {
  console.log("DELETE /questionpaper/:courseId");
});

//
router.get("/:courseId/:set", async (req, res) => {
  const { courseId, set } = req.params;
  try {
    const questionPaper = await service.getByCourseIdSet(
      courseId,
      set,
      database
    );
    res.send(questionPaper);
  } catch (error) {
    res.status(500).send({
      error: true,
      message: toString(error),
    });
  }
});

//
router.delete("/:courseId/:set", async (req, res) => {
  console.log("DELETE /questionpaper/:courseId/:set");
});

//
router.post("", async (req, res) => {
  const { error, value: questionPaper } = questionPaperModel.validate(req.body);
  if (error) {
    res.status(400).send(error["details"][0]["message"]);
    console.log(req.body);
    return;
  }
  try {
    await service.write(questionPaper, database);
    res.send();
  } catch (error) {
    res.status(500).send({
      error: true,
      message: toString(error),
    });
  }
});

//
router.put("", async (req, res) => {
  const { error, value: questionPaper } = questionPaperModel.validate(req.body);
  if (error) {
    res.status(400).send(error["details"][0]["message"]);
    return;
  }
  try {
    await service.update(questionPaper, database);
    res.send();
  } catch (error) {
    res.status(500).send({
      error: true,
      message: toString(error),
    });
  }
});

module.exports = router;
