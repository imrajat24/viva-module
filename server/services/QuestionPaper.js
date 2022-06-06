const getByCourseId = async (courseId, database) => {
    try {
        const { error, value: questionPapers } = await database.getByCourseId(courseId);
        return { error, questionPapers };
    } catch (exception) {
        throw exception;
    }
};

const deleteByCourseId = async (courseId, database) => {
    try {
        const { error, value: deletedQuestionPapers } = await database.deleteByCourseId(courseId);
        return { error, deletedQuestionPapers };
    } catch (exception) {
        throw exception;
    }
};

const getByCourseIdSet = async (courseId, set, database) => {
    try {
        const { error, value: questionPaper } = await database.getByCourseIdSet(courseId, set);
        return { error, questionPaper };
    } catch (exception) {
        throw exception;
    }
};

const deleteByCourseIdSet = async (courseId, set, database) => {
    try {
        const { error, value: deletedQuestionPaper } = await database.deleteByCourseIdSet(courseId, set);
        return { error, deletedQuestionPaper };
    } catch (exception) {
        throw exception;
    }
};

const write = async (questionPaper, database) => {
    try {
        const { error, value: writtenQuestionPaper } = await database.write(questionPaper);
        return { error, writtenQuestionPaper };
    } catch (exception) {
        throw exception;
    }
};

const update = async (questionPaper, database) => {
    try {
        const { error, value: oldQuestionPaper } = await database.update(questionPaper);
        return { error, oldQuestionPaper };
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
};