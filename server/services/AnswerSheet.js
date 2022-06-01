const getByCourseIdTrainerIdTraineeId = async (courseId, trainerId, traineeId, database) => {
    try {
        const answerSheet = await database.getByCourseIdTrainerIdTraineeId(courseId, trainerId, traineeId);
        return answerSheet;
    } catch (error) {
        throw error;
    }
};

const write = async (answerSheet, database) => {
    try {
        await database.write(answerSheet);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getByCourseIdTrainerIdTraineeId,
    write,
};