const { register } = require('./register.service');
const { hashSync, genSaltSync } = require('bcrypt');
const db = require('../../db/database');

module.exports = {
    registerUser: (req, res) => {
        const body = req.body;
        console.log(body);
        if (!body.username || !body.password || !body.email) {
            return res.status(400).json({
                success: 0,
                message: "Please enter all fields"
            });
        }
        // select username and email if exist in table users
        db.query(`select * from users where username = ? or email = ?`, [body.username, body.email], (error, results) => {
            if (error) {
                console.log(error);
            }
            if (results.length > 0) {
                return res.status(401).json("Username or Email already exists");
            } else {
                const salt = genSaltSync(10);
                body.password = hashSync(body.password, salt);
                register(body, (err, results) => {
                    if (err) {
                        console.log(err);
                        return res.status(500).json({
                            success: 0,
                            message: "Database connection error"
                        });
                    }
                    return res.status(200).json({
                        success: 1,
                        data: results
                    });
                });
            }
        });
    }
};