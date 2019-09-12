const db = require('../data/db-config');

module.exports = {
    find,
    findById,
    findSteps,
    add,
    update,
    remove,
    addStep
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
    .select('schemes.id', 'schemes.scheme_name', 'steps.step_number', 'steps.instructions')
        .where({ scheme_id: id })
        .then(steps => steps)
        .catch(err => err)
};

function add(scheme) {
    return db('schemes').insert(scheme)
        .then(success => {
            return findById(success[0])
        })
        .catch(err => err)
};

function update(changes, id) {
    return db('schemes')
        .where({ id })
        .update(changes)
            .then(success => {
                if (success === 1) {
                    return findById(id)
                } else {
                    return null
                }
            })
            .catch(err => err)
};

function remove(id) {
    return db('schemes')
    .where({ id })
    .del()
};

function addStep(step, scheme_id) {
    console.log(step)
    const newStep = {...step, scheme_id}
    return db('steps')
    .insert(newStep)
        .then(succ => succ)
        .catch(err => err)
};
