const mongoose = require("mongoose");
const errors = require("./utils/errors");
const clean = require("./utils/clean");
const {
    DB_ERROR_NOT_FOUND,
    DB_ERROR_ALREADY_EXISTS,
    createResponse
} = errors;

const step = new mongoose.Schema({
    description: String,
    totalMarks: Number,
}, { _id: false });
const question = new mongoose.Schema({
    questionStatement: String,
    steps: [step],
}, { _id: false });
const questionPaperSchema = new mongoose.Schema({
    courseId: String,
    set: String,
    questions: [question],
    deleted: { type: Boolean, default: false },
}, { minimize: false });
const QuestionPaper = mongoose.model("questionpaper", questionPaperSchema);

const getByCourseId = async (courseId) => {
    const filter = {
        courseId,
        deleted: false,
    };
    try {
        const questionPapersFromDB = await QuestionPaper.find(filter).lean();
        if (questionPapersFromDB.length == 0) return createResponse(DB_ERROR_NOT_FOUND, null);
        const questionPapers = [];
        for (const qpdb of questionPapersFromDB) {
            questionPapers.push(clean(qpdb));
        }
        return createResponse(null, questionPapers);
    } catch (exception) {
        throw exception;
    }
};

const deleteByCourseId = async (courseId) => {
    const filter = {
        courseId,
        deleted: false,
    };
    try {
        const questionPapersFromDB = await QuestionPaper.find(filter).lean();
        if (questionPapersFromDB.length == 0) return createResponse(DB_ERROR_NOT_FOUND, null);
        const questionPapers = [];
        for (const qpdb of questionPapersFromDB) {
            questionPapers.push(clean(qpdb));
        }
        await QuestionPaper.updateMany(filter, { $set: { deleted: true } });
        return createResponse(null, questionPapers);
    } catch (exception) {
        throw exception;
    }
};

const getByCourseIdSet = async (courseId, set) => {
    const filter = {
        courseId,
        set,
        deleted: false,
    };
    try {
        const questionPaperFromDB = await QuestionPaper.findOne(filter).lean();
        if (!questionPaperFromDB) return createResponse(DB_ERROR_NOT_FOUND, null);
        const questionPaper = clean(questionPaperFromDB);
        return createResponse(null, questionPaper);
    } catch (exception) {
        throw exception;
    }
};

const deleteByCourseIdSet = async (courseId, set) => {
    const filter = {
        courseId,
        set,
        deleted: false,
    };
    try {
        const questionPaperFromDB = await QuestionPaper.findOne(filter).lean();
        if (!questionPaperFromDB) return createResponse(DB_ERROR_NOT_FOUND, null);
        const questionPaper = clean(questionPaperFromDB);
        await QuestionPaper.updateOne(filter, { $set: { deleted: true } });
        return createResponse(null, questionPaper);
    } catch (exception) {
        throw exception;
    }
};

const write = async (questionPaper) => {
    const filter = {
        courseId: questionPaper["courseId"],
        trainerId: questionPaper["trainerId"],
        traineeId: questionPaper["traineeId"],
        deleted: false,
    };
    try {
        const oldQuestionPaperFromDB = await QuestionPaper.findOne(filter).lean();
        if (oldQuestionPaperFromDB) return createResponse(DB_ERROR_ALREADY_EXISTS, null);
        const newQuestionPaper = new QuestionPaper({ ...questionPaper });
        await newQuestionPaper.save();
        return createResponse(null, questionPaper);
    } catch (exception) {
        throw exception;
    }
};

const update = async (questionPaper) => {
    const filter = {
        courseId: questionPaper["courseId"],
        trainerId: questionPaper["trainerId"],
        traineeId: questionPaper["traineeId"],
        deleted: false,
    };
    try {
        const oldQuestionPaperFromDB = await QuestionPaper.findOne(filter).lean();
        if (!oldQuestionPaperFromDB) return createResponse(DB_ERROR_NOT_FOUND, null);
        const oldQuestionPaper = clean(oldQuestionPaperFromDB);
        await QuestionPaper.updateOne(filter, { ...questionPaper });
        return createResponse(null, oldQuestionPaper);
    } catch (exception) {
        throw exception;
    }
};

const _id = async (courseId, set) => {
    const filter = {
        courseId,
        set,
    };
    try {
        const questionPaperFromDB = await QuestionPaper.findOne(filter).lean();
        if (!questionPaperFromDB) return createResponse(DB_ERROR_NOT_FOUND, null);
        return createResponse(null, questionPaperFromDB._id);
    } catch (exception) {
        throw exception;
    }
};

module.exports = {
    getByCourseId,
    deleteByCourseId,
    getByCourseIdSet,
    deleteByCourseIdSet,
    write,
    update,
    _id,
};