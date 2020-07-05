const repo = require('../repo/SyncRepo')

function getCreateData(id, callback) {
    return repo.getCreateData(id, callback)
}
function getUpdateData(id, callback) {
    return repo.getUpdateData(id, callback)
}


function updateProfileUpdateData(id, changes) {
    return repo.updateProfileUpdateData(id, changes)
}
function updateProfileCreateData(id, changes, callback) {
    return repo.updateProfileCreateData(id, changes, callback)
}
function deleteEntity(profileId, id, callback) {
    return repo.deleteEntity(profileId, id, callback)
}
function resetProfile(id) {
    return repo.resetProfile(id)
}
module.exports = {
    updateProfileUpdateData: updateProfileUpdateData,
    updateProfileCreateData: updateProfileCreateData,
    getCreateData: getCreateData,
    getUpdateData: getUpdateData,
    deleteEntity: deleteEntity,
    resetProfile: resetProfile
}
