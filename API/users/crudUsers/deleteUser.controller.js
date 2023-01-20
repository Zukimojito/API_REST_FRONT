const db = require('../../db/database');
const checkToken = require("jsonwebtoken");

module.exports = {
    deleteUserById: (req, res) => {
        const id = Number(req.params.id);
        let token = req.get("Authorization");

        // check if id exists in the database if not then return error message

        db.query(`select * from users where id = ?`, [id], (error, results) => {
            if (error) {
                console.log(error);
            }
            if (results.length === 0) {
                // check if the token is valid or not
                res.status(404).json({
                    success: 0,
                    message: "Can't delete ! User not found"
                });
            } else {
                if (token) {
                    token = token.slice(7);
                    // Check that user can't delete himself
                    checkToken.verify(token, "heheyou", (err, decoded) => {
                        // check actually token id is equal to id in params
                        // if (decoded.result[0].id === id) {
                        //     return res.status(401).json({
                        //         success: 0,
                        //         message: "You can't delete yourself"
                        //     });

                        db.query(`delete from users where id = ?`, [id], (error, results) => {
                            if (error) {
                                console.log(error);
                            }
                            if (results) {
                                return res.json("User deleted successfully");
                            } else {
                                return res.status(403).json("Failed to delete user");
                            }
                        });

                    });
                }
            }
        }
        );
    }
}
