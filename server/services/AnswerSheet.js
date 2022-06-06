const getByCourseIdTrainerIdTraineeId = async (courseId, trainerId, traineeId, database) => {
    try {
        const { error, value: answerSheet } = await database.getByCourseIdTrainerIdTraineeId(courseId, trainerId, traineeId);
        return { error, answerSheet };
    } catch (exception) {
        throw exception;
    }
};

const write = async (answerSheet, database) => {
    try {
        const { error, value: writtenAnswerSheet } = await database.write(answerSheet);
        return { error, writtenAnswerSheet };
    } catch (exception) {
        throw exception;
    }
};

module.exports = {
    getByCourseIdTrainerIdTraineeId,
    write,
};