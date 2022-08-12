const mongoose = require("mongoose");
const errors = require("./utils/errors");
const clean = require("./utils/clean");
const vivaDB = require("./Viva");
const questionPaperDB = require("./QuestionPaper");
const { DB_ERROR_NOT_FOUND, DB_ERROR_ALREADY_EXISTS, createResponse } = errors;

const step = new mongoose.Schema(
  {
    description: String,
    givenMarks: Number,
  },
  { _id: false }
);
const answer = new mongoose.Schema(
  {
    steps: [step],
    remarks: String,
  },
  { _id: false }
);
const answerSheetSchema = new mongoose.Schema(
  {
    courseId: String,
    set: String,
    trainerId: String,
    traineeId: String,
    answers: [answer],
  },
  { minimize: false }
);
const AnswerSheet = mongoose.model("answersheet", answerSheetSchema);

const getByCourseIdTraineeId = async (courseId, traineeId) => {
  const filter = {
    courseId,
    traineeId,
  };
  try {
    const answerSheetFromDB = await AnswerSheet.findOne(filter).lean();
    if (!answerSheetFromDB) return createResponse(DB_ERROR_NOT_FOUND, null);
    const answerSheet = clean(answerSheetFromDB);
    return createResponse(null, answerSheet);
  } catch (exception) {
    throw exception;
  }
};

const write = async (answerSheet) => {
  const { courseId, set, trainerId, traineeId } = answerSheet;
  const filter = {
    courseId,
    trainerId,
    traineeId,
  };
  try {
    const oldAnswerSheetFromDB = await AnswerSheet.findOne(filter).lean();
    if (oldAnswerSheetFromDB)
      return createResponse(DB_ERROR_ALREADY_EXISTS, null);
    const { error: verr } = await vivaDB.getByCourseIdTraineeId(
      courseId,
      traineeId
    );
    if (verr) throw Error("Viva does not exist");
    const { error: qerr } = await questionPaperDB.getByCourseIdSet(
      courseId,
      set
    );
    if (qerr) throw Error("Question paper does not exist");
    const newAnswerSheet = new AnswerSheet({ ...answerSheet });
    await newAnswerSheet.save();
    const { value: qpid } = await questionPaperDB._id(courseId, set);
    const asid = newAnswerSheet._id;

    const vivaUpdate = {
      courseId,
      traineeId,
      status: 2,
      trainerDate: Date.now(),
      questionPaper: qpid,
      answerSheet: asid,
    };
    await vivaDB.update(vivaUpdate);
    return createResponse(null, answerSheet);
  } catch (exception) {
    throw exception;
  }
};

const update = async (answersheet) => {
  const filter = {
    courseId: answersheet["courseId"],
    trainerId: answersheet["trainerId"],
    traineeId: answersheet["traineeId"],
  };
  try {
    const oldAnswerSheetFromDB = await AnswerSheet.findOne(filter).lean();
    if (!oldAnswerSheetFromDB) return createResponse(DB_ERROR_NOT_FOUND, null);
    const oldAnswerSheet = clean(oldAnswerSheetFromDB);
    await AnswerSheet.updateOne(filter, { ...answersheet });
    return createResponse(null, oldAnswerSheet);
  } catch (exception) {
    throw exception;
  }
};

module.exports = {
  getByCourseIdTraineeId,
  write,
  update,
};
