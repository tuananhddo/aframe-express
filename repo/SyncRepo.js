const connection = require('../config/dbConnection.js');
const auth = require('../service/authService')

function updateProfileUpdateData(profileId, updateData) {

    let sqlOldData = "SELECT * FROM profile WHERE id = ?";
    if (auth.isEmpty(updateData)) {
        return
    }
    let oldData = {};

    connection.query(sqlOldData, [profileId], function (err, results) {
        if (err) throw err;
        if (results.length == 0) throw "Not Found Profile";
        let ProfileResult = results[0];
        if (ProfileResult.updateData) {
            oldData = JSON.parse(ProfileResult.updateData);
        }
        let newData = {...oldData, ...updateData};
        let dataString = JSON.stringify(newData);

        let sql = "UPDATE profile SET updateData = ? WHERE id = ?";
        console.log('updateData ' + sql)
        connection.query(sql, [dataString, profileId], function (err, results) {
            if (err) throw err;
            console.log(results.affectedRows + " record(s) updated");
        });
    });
}

function updateProfileCreateData(profileId, updateData) {
    let oldData = [];
    let sqlOldData = "SELECT * FROM profile WHERE id = ?";
    if (auth.isEmpty(updateData)) {
        return
    }
    connection.query(sqlOldData, [profileId], function (err, results) {
        if (err) throw err;
        if (results.length == 0) throw "Not Found Profile";
        let ProfileResult = results[0];
        if (ProfileResult.createData) {
            oldData = JSON.parse(ProfileResult.createData);
        }
        let newData = [...oldData, updateData];
        let dataString = JSON.stringify(newData);

        let sql = "UPDATE profile SET createData = ? WHERE id = ?";
        console.log('updateCreateData ' + sql)
        connection.query(sql, [dataString, profileId], function (err, results) {
            if (err) throw err;
            console.log(results.affectedRows + " record(s) updated");
        });
    });


}

function getCreateData(profileId, callback) {
    let sql = 'SELECT createData FROM profile WHERE id = ?'
    connection.query(sql, [profileId], function (err, results) {
        if (err) throw err;
        if (results[0].createData) {
            callback(JSON.parse(results[0].createData))
        } else {
            callback([])
        }

        // console.log(results[0].createData);
        // return JSON.parse(results[0].createData);
    });
}

function getUpdateData(profileId, callback) {
    let sql = 'SELECT updateData FROM profile WHERE id = ?'
    connection.query(sql, [profileId], function (err, results) {
        if (err) throw err;
        let data = results[0].updateData
        console.log(data);
        if (data) {
            callback(JSON.parse(results[0].updateData))
        } else {
            callback({})
        }
        // return JSON.parse(results[0].createData);
    });
}

function processUpdateData(data, deleteId) {
    if (!!data) {
        let jsonData = JSON.parse(data);


        // const keys = Object.keys(jsonData)
        // for (const key of keys) {
        //     if (key == deleteId){
        //
        //     }
        //     console.log(key)
        // }
        if (jsonData === null) {
            return {}
        }
        let {[deleteId]: _, ...result} = jsonData;
        return result
    } else {
        return data
    }
}


function processCreateData(data, deleteId) {
    if (data) {
        let jsonData = !!data ? JSON.parse(data) : []
        return jsonData.filter((item) => {
            console.log(item.components.id);
            return item.components.id != deleteId
        })

    } else {
        return data
    }
}

function deleteEntity(profileId, deleteId, callback) {
    let sql = 'SELECT * FROM profile WHERE id = ?'
    connection.query(sql, [profileId], function (err, results) {
        if (err) throw err;
        let data = results[0]

        if (data) {
            let newUpdateDataJson = processUpdateData(data.updateData, deleteId);
            let newCreateDataJson = processCreateData(data.createData, deleteId);

            let sql = "UPDATE profile SET createData = ?,updateData = ? WHERE id = ?";

            connection.query(sql, [JSON.stringify(newCreateDataJson), JSON.stringify(newUpdateDataJson), profileId], function (err, results) {
                if (err) throw err;
                console.log(results.affectedRows + " record(s) updated");
            });
            callback({})
        } else {
            callback({})
        }
        // return JSON.parse(results[0].createData);
    });
}

function resetProfile(profileId, callback) {

    let sql = "UPDATE profile SET createData = ?,updateData = ? WHERE id = ?";

    connection.query(sql, ["", "", profileId], function (err, results) {
        if (err) throw err;
        console.log(results.affectedRows + " record(s) updated");
    });
    callback({})

}

module.exports = {
    updateProfileUpdateData: updateProfileUpdateData,
    updateProfileCreateData: updateProfileCreateData,
    getCreateData: getCreateData,
    getUpdateData: getUpdateData,
    deleteEntity: deleteEntity,
    resetProfile: resetProfile
}
