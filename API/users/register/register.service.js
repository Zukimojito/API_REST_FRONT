const db = require('../../db/database');


// create a module export for the user service for insertion into

module.exports = {
    register: (data, callBack) => {
        db.query(
            `insert into users(username, password, role, email, adresse, money) values(?, ?, 0, ?, ?, 0)`,
            [
                data.username,
                data.password,
                data.email,
                data.adresse,
            ],
            (error, results, fields) => {
                if (error) {
                    callBack(error);
                }
                return callBack(null, results);
            }
        );
    }
};