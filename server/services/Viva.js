const getByCourseId = async (courseId, database) => {
  try {
    const { error, value: vivas } = await database.getByCourseId(courseId);
    return { error, vivas };
  } catch (exception) {
    throw exception;
  }
};

const getByCourseIdTrainerId = async (courseId, trainerId, database) => {
  try {
    const { error, value: vivas } = await database.getByCourseIdTrainerId(
      courseId,
      trainerId
    );
    return { error, vivas };
  } catch (exception) {
    throw exception;
  }
};

const getByCourseIdTraineeId = async (courseId, traineeId, database) => {
  try {
    const { error, value: viva } = await database.getByCourseIdTraineeId(
      courseId,
      traineeId
    );
    return { error, viva };
  } catch (exception) {
    throw exception;
  }
};

const write = async (viva, database) => {
  try {
    const { error, value: writtenViva } = await database.write(viva);
    return { error, writtenViva };
  } catch (exception) {
    throw exception;
  }
};

const update = async (viva, database) => {
  try {
    const { error, value: oldViva } = await database.update(viva);
    return { error, oldViva };
  } catch (exception) {
    throw exception;
  }
};

module.exports = {
  getByCourseId,
  getByCourseIdTrainerId,
  getByCourseIdTraineeId,
  write,
  update,
};
