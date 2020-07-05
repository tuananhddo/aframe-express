const connection = require('../config/dbConnection.js');

function listProfile(user, callback) {

    let sql = "SELECT name,description,id FROM profile WHERE id in (SELECT profile_id from userprofile WHERE user_id = ?)";

    connection.query(sql, [user.id], function (err, results) {
        if (err) throw err;
        // console.log(results)
        callback(results)
    });
}

function getProfileByNameAndUser(user, profileName, callback) {
    let sql = "SELECT * FROM profile WHERE name=? AND " +
        "id in (SELECT profile_id from userprofile WHERE user_id = ?)";

    connection.query(sql, [profileName, user.id], function (err, results) {
        if (err) throw err;
        console.log(results)
        if (results.length <= 0) {
            callback(null)
        } else {
            callback(results[0])
        }
    });
}

function createProfile(req, callback) {
    const profileData = req.body;
    let sql = "INSERT INTO profile (name, description) VALUES (?,?)";

    connection.query(sql, [profileData.name, profileData.description], function (err, results) {
        if (err) throw err;
        let sqlUS = "INSERT INTO userprofile (user_id,profile_id) VALUES (?,?)";
        console.log('Infected Row ' + results.insertId)
        connection.query(sqlUS, [req.user.id, results.insertId], function (err, results) {
            if (err) throw err;
            console.log('UserProfile Inserted');
        });
    });
    callback({})
}

module.exports = {
    listProfile: listProfile,
    getProfileByNameAndUser: getProfileByNameAndUser,
    createProfile: createProfile
}
