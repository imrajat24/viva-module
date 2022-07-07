const getByCourseIdTraineeId = async (courseId, traineeId, database) => {
  try {
    const { error, value: answerSheet } = await database.getByCourseIdTraineeId(
      courseId,
      traineeId
    );
    return { error, answerSheet };
  } catch (exception) {
    throw exception;
  }
};

const write = async (answerSheet, database) => {
  try {
    const { error, value: writtenAnswerSheet } = await database.write(
      answerSheet
    );
    return { error, writtenAnswerSheet };
  } catch (exception) {
    throw exception;
  }
};
const update = async (answerSheet, database) => {
  try {
    const { error, value: oldAnswerSheet } = await database.update(answerSheet);
    return { error, oldAnswerSheet };
  } catch (exception) {
    throw exception;
  }
};

module.exports = {
  getByCourseIdTraineeId,
  write,
  update,
};
