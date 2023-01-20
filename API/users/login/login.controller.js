const { compareSync } = require('bcrypt');
const db = require('../../db/database');
const jwt = require('jsonwebtoken');

module.exports = {
    loginUser: (req, res) => {
        const body = req.body;
        console.log(body);
        db.query(`select * from users where username = ?`, [body.username], (error, results) => {
            if (error) {
                console.log(error);
            }
            if (results.length > 0) {
                console.log("results ::: ", results[0].password);
                console.log("body.password ::: ", body.password);

                //check if password is correct
                const result = compareSync(body.password, results[0].password);
                if (result || body.password === results[0].password) {
                    results.password = undefined;
                    const jsontoken = jwt.sign({ result: results }, "heheyou", {
                        subject: results[0].id.toString(),
                        expiresIn: "3h"
                    });
                    res.cookie('token', jsontoken, { httpOnly: true });
                    return res.json(jsontoken)
                } else {
                    return res.status(400).json("Invalid password !");
                }
            } else {
                return res.status(400).json("Invalid username !");
            }
        });
    }
};