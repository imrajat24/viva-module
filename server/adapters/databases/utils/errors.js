const DB_ERROR_NOT_FOUND = {
    message: "Entity does not exist"
};

const DB_ERROR_ALREADY_EXISTS = {
    message: "Entity already exists"
};

const createResponse = (error, value) => {
    return {
        error: error ? error : null,
        value: error ? null : value,
    };
};

module.exports = {
    DB_ERROR_NOT_FOUND,
    DB_ERROR_ALREADY_EXISTS,
    createResponse,
};