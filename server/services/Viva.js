const getByCourseId = async (courseId, database) => {
    try {
        const vivas = await database.getByCourseId(courseId);
        return vivas;
    } catch (error) {
        throw error;
    }
};

const getByCourseIdTrainerId = async (courseId, trainerId, database) => {
    try {
        const vivas = await database.getByCourseIdTrainerId(courseId, trainerId);
        return vivas;
    } catch (error) {
        throw error;
    }
};

const getByCourseIdTrainerIdTraineeId = async (courseId, trainerId, traineeId, database) => {
    try {
        const viva = await database.getByCourseIdTrainerIdTraineeId(courseId, trainerId, traineeId);
        return viva;
    } catch (error) {
        throw error;
    }
};

const write = async (viva, database) => {
    try {
        await database.write(viva);
    } catch (error) {
        throw error;
    }
};

const update = async (viva, database) => {
    try {
        await database.update(viva);
    } catch (error) {
        throw error;
    }
};

module.exports = {
    getByCourseId,
    getByCourseIdTrainerId,
    getByCourseIdTrainerIdTraineeId,
    write,
    update,
};