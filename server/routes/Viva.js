const express = require("express");
const viva = require("../models/Viva");
const router = express.Router();

router.get("/:courseId", (req, res) => {
    const response = {
        courseId: req.params.courseId,
    }
    res.send(response);
});
router.get("/:courseId/:trainerId", (req, res) => {
    const response = {
        courseId: req.params.courseId,
        trainerId: req.params.trainerId,
    };
    res.send(response);
});
router.get("/:courseId/:trainerId/:traineeId", (req, res) => {
    const response = {
        courseId: req.params.courseId,
        trainerId: req.params.trainerId,
        traineeId: req.params.traineeId,
    };
    res.send(response);
});
router.post("", (req, res) => {
    const {error, value} = viva.validate(req.body);
    if (error) {
        res.status(400).send(error["details"][0]["message"]);
        return;
    }
    res.send(value);
});
router.put("", (req, res) => {
    const {error, value} = viva.validate(req.body);
    if (error) {
        res.status(400).send(error["details"][0]["message"]);
        return;
    }
    res.send(value);
});

module.exports = router;