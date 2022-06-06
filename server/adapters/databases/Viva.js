const mongoose = require("mongoose");
const errors = require("./utils/errors");
const clean = require("./utils/clean");
const {
    DB_ERROR_NOT_FOUND,
    DB_ERROR_ALREADY_EXISTS,
    createResponse
} = errors;

const vivaSchema = new mongoose.Schema({
    courseId: String,
    trainerId: String,
    traineeId: String,
    status: { type: Number, min: 0, max: 2 },
    questionPaper: { type: mongoose.Types.ObjectId, ref: "questionpaper" },
    answerSheet: { type: mongoose.Types.ObjectId, ref: "answersheet" },
});
const Viva = mongoose.model("viva", vivaSchema);

const getByCourseId = async (courseId) => {
    const filter = {
        courseId
    };
    try {
        const vivasFromDB = await Viva.
            find(filter).
            populate("questionPaper").
            populate("answerSheet").
            lean();
        if (vivasFromDB.length == 0) return createResponse(DB_ERROR_NOT_FOUND, null);
        const vivas = [];
        for (const vdb of vivasFromDB) {
            vdb.questionPaper = clean(vdb.questionPaper);
            vdb.answerSheet = clean(vdb.answerSheet);
            vivas.push(clean(vdb));
        }
        return createResponse(null, vivas);
    } catch (exception) {
        throw exception;
    }
};

const getByCourseIdTrainerId = async (courseId, trainerId) => {
    const filter = {
        courseId,
        trainerId,
    };
    try {
        const vivasFromDB = await Viva.
            find(filter).
            populate("questionPaper").
            populate("answerSheet").
            lean();
        if (vivasFromDB.length == 0) return createResponse(DB_ERROR_NOT_FOUND, null);
        const vivas = [];
        for (const vdb of vivasFromDB) {
            vdb.questionPaper = clean(vdb.questionPaper);
            vdb.answerSheet = clean(vdb.answerSheet);
            vivas.push(clean(vdb));
        }
        return createResponse(null, vivas);
    } catch (exception) {
        throw exception;
    }
};

const getByCourseIdTrainerIdTraineeId = async (courseId, trainerId, traineeId) => {
    const filter = {
        courseId,
        trainerId,
        traineeId,
    };
    try {
        const vivaFromDB = await Viva.
            findOne(filter).
            populate("questionPaper").
            populate("answerSheet").
            lean();
        if (!vivaFromDB) return createResponse(DB_ERROR_NOT_FOUND, null);
        vivaFromDB.questionPaper = clean(vivaFromDB.questionPaper);
        vivaFromDB.answerSheet = clean(vivaFromDB.answerSheet);
        const viva = clean(vivaFromDB);
        return createResponse(null, viva);
    } catch (exception) {
        throw exception;
    }
};

const write = async (viva) => {
    const filter = {
        courseId: viva["courseId"],
        trainerId: viva["trainerId"],
        traineeId: viva["traineeId"],
    };
    try {
        const oldVivaFromDB = await Viva.
            findOne(filter).
            populate("questionPaper").
            populate("answerSheet").
            lean();
        if (oldVivaFromDB) return createResponse(DB_ERROR_ALREADY_EXISTS, null);
        const newViva = new Viva({ ...viva });
        await newViva.save();
        return createResponse(null, viva);
    } catch (exception) {
        throw exception;
    }
};

const update = async (viva) => {
    const filter = {
        courseId: viva["courseId"],
        trainerId: viva["trainerId"],
        traineeId: viva["traineeId"],
    };
    try {
        const oldVivaFromDB = await Viva.
            findOne(filter).
            populate("questionPaper").
            populate("answerSheet").
            lean();
        if (!oldVivaFromDB) return createResponse(DB_ERROR_NOT_FOUND, null);
        oldVivaFromDB.questionPaper = clean(oldVivaFromDB.questionPaper);
        oldVivaFromDB.answerSheet = clean(oldVivaFromDB.answerSheet);
        const oldViva = clean(oldVivaFromDB);
        await Viva.updateOne(filter, { ...viva });
        return createResponse(null, oldViva);
    } catch (exception) {
        throw exception;
    }
};

module.exports = {
    getByCourseId,
    getByCourseIdTrainerId,
    getByCourseIdTrainerIdTraineeId,
    write,
    update,
};