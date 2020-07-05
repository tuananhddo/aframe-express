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
    if ((Object.keys(profileData).length === 0 && profileData.constructor === Object) || !profileData.name || !profileData.description
    ) {
        return callback(null)
    } else {
        let checkSQL = "SELECT name,description,id FROM profile " +
            "WHERE id in (SELECT profile_id from userprofile WHERE user_id = ?) " +
            "AND name = ?";
        connection.query(checkSQL, [req.user.id, profileData.name], function (err, results) {
            if (err) throw err;
            if (results.length > 0) {
                console.log('EXIST')
                return callback(null)
            }
            let sql = "INSERT INTO profile (name, description) VALUES (?,?)";
            let getProfileSql = 'SELECT * FROM profile WHERE id = ?'
            connection.query(sql, [profileData.name, profileData.description], function (err, results) {
                if (err) throw err;
                let sqlUS = "INSERT INTO userprofile (user_id,profile_id) VALUES (?,?)";
                console.log('Infected Row ' + results.insertId)
                connection.query(sqlUS, [req.user.id, results.insertId], function (err, results) {
                    if (err) throw err;
                    console.log('UserProfile Inserted');
                });
                connection.query(getProfileSql, [results.insertId], function (err, results) {
                    if (err) throw err;
                    if (results.length <= 0) {
                        return callback(null)
                    }
                    return callback(results[0])

                });
            });
        })

    }
}

function deleteProfile(req, callback) {
    let deleteInProfileSql = "DELETE FROM profile WHERE id = ?  AND id in (SELECT profile_id from userprofile WHERE user_id = ?)";
    let deleteInUserProfileSql = "DELETE FROM userprofile WHERE profile_id = ? AND user_id = ?";
    const profileData = req.body;
    if ((Object.keys(profileData).length === 0 && profileData.constructor === Object) || !profileData.id
    ) {
        return callback(null)
    } else {
        connection.query(deleteInUserProfileSql, [profileData.id, req.user.id], function (err, results) {
            if (err) throw err;
            connection.query(deleteInProfileSql, [profileData.id, req.user.id], function () {
                callback({})
            })
        });
    }
}

module.exports = {
    listProfile: listProfile,
    getProfileByNameAndUser: getProfileByNameAndUser,
    createProfile: createProfile,
    deleteProfile: deleteProfile
}
