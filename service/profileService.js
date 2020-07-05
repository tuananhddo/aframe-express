const repo = require('../repo/ProfileRepo')

function getListProfile(user, callback) {
    return repo.listProfile(user, callback)
}
function getProfileByNameAndUser(user, profileName, callback) {
    return repo.getProfileByNameAndUser(user, profileName, callback)
}
function createProfile(req, callback){
    return repo.createProfile(req, callback)
}
function deleteProfile(req, callback){
    return repo.deleteProfile(req, callback)
}
module.exports = {
    getLisProfile: getListProfile,
    getProfileByNameAndUser: getProfileByNameAndUser,
    createProfile: createProfile,
    deleteProfile: deleteProfile
};
