const db = require('../data/db-config');

module.exports = {
    find,
    findById,
    findSteps,
    add,
};

function find() {
    return db('schemes')
};

function findById(id) {
    return db('schemes')
        .where({ id })
};

function findSteps(id) {
    return db('schemes')
        .join('steps', 'schemes.id', '=', 'steps.scheme_id')
        .where({ scheme_id: id })
        .then(steps => steps)
        .catch(err => err)
};

function add(scheme) {
    return db('schemes').insert(scheme)
        .then(success => success)
        .catch(err => err)
};
