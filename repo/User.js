const connection = require('../config/dbConnection.js');
const auth = require('../service/authService')

function updateUserData(user, updateData) {

    let sqlOldData = "SELECT * FROM user WHERE username = ?";
    if (auth.isEmpty(updateData)) {
        return
    }
    let oldData = {};

    connection.query(sqlOldData, [user.username], function (err, results) {
        if (err) throw err;
        if (results.length == 0) throw "Not Found User";
        let userResult = results[0];
        if (userResult.updateData) {
            oldData = JSON.parse(userResult.updateData);
        }
        let newData = {...oldData, ...updateData};
        let dataString = JSON.stringify(newData);

        let sql = "UPDATE user SET updateData = ? WHERE username = ?";
        console.log('updateData ' + sql)
        connection.query(sql, [dataString, user.username], function (err, results) {
            if (err) throw err;
            console.log(results.affectedRows + " record(s) updated");
        });
    });
}

function updateUserCreateData(user, updateData) {
    let oldData = [];
    let sqlOldData = "SELECT * FROM user WHERE username = ?";
    if (auth.isEmpty(updateData)) {
        return
    }
    connection.query(sqlOldData, [user.username], function (err, results) {
        if (err) throw err;
        if (results.length == 0) throw "Not Found User";
        let userResult = results[0];
        if (userResult.createData) {
            oldData = JSON.parse(userResult.createData);
        }
        let newData = [...oldData, updateData];
        let dataString = JSON.stringify(newData);

        let sql = "UPDATE user SET createData = ? WHERE username = ?";
        console.log('updateCreateData ' + sql)
        connection.query(sql, [dataString, user.username], function (err, results) {
            if (err) throw err;
            console.log(results.affectedRows + " record(s) updated");
        });
    });


}

function getCreateData(username, callback) {
    let sql = 'SELECT createData FROM user WHERE username = ?'
    connection.query(sql, [username], function (err, results) {
        if (err) throw err;
        // console.log(results[0].createData);
        callback(JSON.parse(results[0].createData))
        // return JSON.parse(results[0].createData);
    });
}

function getUpdateData(username, callback) {
    let sql = 'SELECT updateData FROM user WHERE username = ?'
    connection.query(sql, [username], function (err, results) {
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
    if (data) {
        let jsonData = JSON.parse(data)
        const keys = Object.keys(jsonData)
        // for (const key of keys) {
        //     if (key == deleteId){
        //
        //     }
        //     console.log(key)
        // }
        let {[deleteId]: _, ...result} = jsonData;
        return result
    } else {
        return data
    }
}


function processCreateData(data, deleteId) {
    if (data) {
        let jsonData = JSON.parse(data)
        return jsonData.filter((item) => {
            console.log(item.components.id);
            return item.components.id != deleteId
        })

    } else {
        return data
    }
}

function deleteEntity(username, deleteId, callback) {
    let sql = 'SELECT updateData,createData FROM user WHERE username = ?'
    connection.query(sql, [username], function (err, results) {
        if (err) throw err;
        let data = results[0]

        if (data) {
            let newUpdateDataJson = processUpdateData(data.updateData, deleteId);
            let newCreateDataJson = processCreateData(data.createData, deleteId)

            let sql = "UPDATE user SET createData = ?,updateData = ? WHERE username = ?";

            connection.query(sql, [JSON.stringify(newCreateDataJson), JSON.stringify(newUpdateDataJson), username], function (err, results) {
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

module.exports = {
    updateUserData: updateUserData,
    updateUserCreateData: updateUserCreateData,
    getCreateData: getCreateData,
    getUpdateData: getUpdateData,
    deleteEntity: deleteEntity
}
