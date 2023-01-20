const db = require('../../db/database');
const jwt = require('jsonwebtoken');

module.exports = {
    CheckLogin: (req, res, next) => {
        let token = req.get("Authorization");
        if (token) {
            token = token.slice(7);
            jwt.verify(token, "heheyou", (err, decoded) => {
                if (err) {
                    return res.status(400).json({
                        success: 0,
                        message: "Invalid token"
                    });
                } else {
                    console.log("decoded ID user : ", decoded.result[0]);
                    db.query("SELECT * FROM users WHERE id = ?", [decoded.result[0].id], (err, result) => {
                        if (err) { throw err; }
                        if (result !== 0) {
                            console.log("You are connected ! Welcome " + result[0].username);
                            next();
                        }
                    });
                }
            });
        } else {
            return res.status(400).json({
                success: 0,
                message: "You should connected with token"
            });
        }
    }
}