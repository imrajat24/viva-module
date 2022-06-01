const getByCourseId = async (courseId, database) => {
    try {
        const questionPapers = await database.getByCourseId(courseId);
        return questionPapers;
    }
    catch (error) {
        console.log(error);
    }
};

const deleteByCourseId = async (courseId, database) => {
    try {
        await database.deleteByCourseId(courseId);
    } catch (error) {
        throw error;
    }
};

const getByCourseIdSet = async (courseId, set, database) => {
    try {
        const questionPaper = database.getByCourseIdSet(courseId, set);
        return questionPaper;
    } catch (error) {
        throw error;
    }
};

const deleteByCourseIdSet = async (courseId, set, database) => {
    try {
        await database.deleteByCourseIdSet(courseId, set);
    } catch (error) {
        throw error;
    }
};

const write = async (questionPaper, database) => {
    try {
        await database.write(questionPaper);
    } catch (error) {
        throw error;
    }
};

const update = async (questionPaper, database) => {
    try {
        await database.update(questionPaper);
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