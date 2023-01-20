const db = require('../../db/database');
const jwt = require('jsonwebtoken');

module.exports = {
    showData: (req, res) => {
        let token = req.get("Authorization");
        if (token) {
            token = token.slice(7);
            jwt.verify(token, "heheyou", (err, decoded) => {
                if (err) {
                    return res.status(401).json({
                        success: 0,
                        message: "Invalid token"
                    });
                } else {
                    console.log("decoded ID user : ", decoded.result[0].id);
                    db.query(`select * from users where id = ?`, [decoded.result[0].id], (error, results) => {
                        if (error) {
                            console.log(error);
                        }
                        if (results.length > 0) {
                            return res.json(results[0]);
                        } else {
                            return res.status(404).json({
                                success: 0,
                                message: "Record not found"
                            });
                        }
                    });
                }
            });
        }
        else {
            return res.status(401).json({
                success: 0,
                message: "Error ! need token"
            });
        }
    }
};