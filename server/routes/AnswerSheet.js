const express = require("express");
const answerSheet = require("../models/AnswerSheet");
const router = express.Router();

router.get("/:courseId/:trainerId/:traineeId", (req, res) => {
    const response = {
        courseId: req.params.courseId,
        trainerId: req.params.trainerId,
        traineeId: req.params.traineeId,
    }
    res.send(response);
});
router.post("", (req, res) => {
    const {error, value} = answerSheet.validate(req.body);
    if (error) {
        res.status(400).send(error["details"][0]["message"]);
        return;
    }
    res.send(value);
});

module.exports = router;