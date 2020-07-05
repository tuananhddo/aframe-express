const repo = require('../repo/User')

function getListProfile(user, callback) {
    return repo.listProfile(user, callback)
}
function getProfileByNameAndUser(user, profileName, callback) {
    return repo.getProfileByNameAndUser(user, profileName, callback)
}
function createProfile(req, callback){
    return repo.createProfile(req, callback)
}
module.exports = {
    getLisProfile: getListProfile,
    getProfileByNameAndUser: getProfileByNameAndUser,
    createProfile: createProfile
};
