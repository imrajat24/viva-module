const clean = (object) => {
    if (!object) return;
    delete object._id;
    delete object.id;
    delete object.__v;
    delete object.deleted;
    return object;
};

module.exports = clean;