const express = require("express");
const router = express.Router();
const validate = require("../adapters/validators/routes/QuestionPaper");
const database = require("../adapters/databases/QuestionPaper");
const service = require("../services/QuestionPaper");
const errors = require("../adapters/databases/utils/errors");

router.get("/:courseId", async (req, res) => {
    const { courseId } = req.params;
    try {
        const { error, questionPapers } = await service.getByCourseId(courseId, database);
        if (error === errors.DB_ERROR_NOT_FOUND) {
            return res.status(404).send(error);
        }
        return res.status(200).send(questionPapers);
    } catch (exception) {
        console.log(exception);
        return res.status(500).send();
    }
});
router.delete("/:courseId", async (req, res) => {
    const { courseId } = req.params;
    try {
        const { error, deletedQuestionPapers } = await service.deleteByCourseId(courseId, database);
        if (error === errors.DB_ERROR_NOT_FOUND) {
            return res.status(404).send(error);
        }
        return res.status(200).send(deletedQuestionPapers);
    } catch (exception) {
        console.log(exception);
        return res.status(500).send();
    }
});
router.get("/:courseId/:set", async (req, res) => {
    const { courseId, set } = req.params;
    try {
        const { error, questionPaper } = await service.getByCourseIdSet(courseId, set, database);
        if (error === errors.DB_ERROR_NOT_FOUND) {
            return res.status(404).send(error);
        }
        return res.status(200).send(questionPaper);
    } catch (exception) {
        console.log(exception);
        return res.status(500).send();
    }
});
router.delete("/:courseId/:set", async (req, res) => {
    const { courseId, set } = req.params;
    try {
        const { error, deletedQuestionPaper } = await service.deleteByCourseIdSet(courseId, set, database);
        if (error === errors.DB_ERROR_NOT_FOUND) {
            return res.status(404).send(error);
        }
        return res.status(200).send(deletedQuestionPaper);
    } catch (exception) {
        console.log(exception);
        return res.status(500).send();
    }
});
router.post("", async (req, res) => {
    const { error, questionPaper } = validate(req.body);
    if (error) return res.status(400).send({ error });

    try {
        const { error, writtenQuestionPaper } = await service.write(questionPaper, database);
        if (error === errors.DB_ERROR_ALREADY_EXISTS) {
            return res.status(409).send(error);
        }
        return res.status(200).send(writtenQuestionPaper);
    } catch (exception) {
        console.log(exception);
        return res.status(500).send();
    }
});
router.put("", async (req, res) => {
    const { error, questionPaper } = validate(req.body);
    if (error) return res.status(400).send({ error });

    try {
        const { error, oldQuestionPaper } = await service.update(questionPaper, database);
        if (error === errors.DB_ERROR_NOT_FOUND) {
            res.status(404).send(error);
        }
        return res.status(200).send(oldQuestionPaper);
    } catch (exception) {
        console.log(exception);
        return res.status(500).send();
    }
});

module.exports = router;