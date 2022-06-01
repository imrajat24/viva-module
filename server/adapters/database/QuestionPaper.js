const mongoose = require("mongoose");

const step = new mongoose.Schema({
    description: String,
    totalMarks: Number,
});
const question = new mongoose.Schema({
    questionStatement: String,
    steps: [step],
});
const questionPaperSchema = new mongoose.Schema({
    courseId: String,
    set: String,
    questions: [question],
});
const QuestionPaper = mongoose.model("questionpaper", questionPaperSchema);

const getByCourseId = async (courseId) => {
    try {
        const questionPapers = await QuestionPaper.find({
            courseId
        });
        return questionPapers;
    } catch (error) {
        throw error;
    }
};

const deleteByCourseId = async (courseId) => {
    // Todo
};

const getByCourseIdSet = async (courseId, set) => {
    try {
        const questionPaper = await QuestionPaper.findOne({
            courseId,
            set,
        });
        return questionPaper
    } catch (error) {
        throw error;
    }
};

const deleteByCourseIdSet = async (courseId, set) => {
    // Todo
};

const write = async (questionPaper) => {
    try {
        const newQuestionPaper = new QuestionPaper({
            ...questionPaper
        });
        await newQuestionPaper.save();
    } catch (error) {
        throw error;
    }
};

const update = async (questionPaper) => {
    const filter = {
        courseId: questionPaper["courseId"],
        trainerId: questionPaper["trainerId"],
        traineeId: questionPaper["traineeId"],
    };
    try {
        await QuestionPaper.updateOne(filter, {
            ...questionPaper
        });
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getByCourseId,
    deleteByCourseId,
    getByCourseIdSet,
    deleteByCourseIdSet,
    write,
    update,
};