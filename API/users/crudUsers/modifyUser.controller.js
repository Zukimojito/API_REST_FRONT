const db = require('../../db/database');
const { hashSync, genSaltSync } = require('bcrypt');

module.exports = {
    modifyUserById: (req, res) => {
        const id = req.params.id;
        const body = req.body;
        if (!body.role) {
            body.role = 0;
        }

        console.log(body.password);

        // if (!id) {
        //     return res.status(204).json({
        //         success: 0,
        //         message: "Id is required"
        //     });
        // }

        // if body is empty then not updating
        if (!body.username || !body.email || !body.adresse) {
            return res.status(400).json({
                success: 0,
                message: "Please fill all fields"
            });
        }

        db.query(`SELECT * FROM users WHERE id = ${id}`, (err, result) => {
            if (err) {
                return res.status(400).json({
                    success: 0,
                    message: err
                });
            }
            if (result.length === 0) {
                // return error 404
                return res.status(404).send('user not found');
            } else {
                // check if the username & email exists in the database except the current user with "id != ?"
                db.query(`select * from users where (username = ? or email = ?) and id != ?`, [body.username, body.email, id], (error, results) => {
                    if (error) {
                        console.log(error);
                    }
                    if (results.length > 0) {
                        return res.status(401).json("Username or Email already exists");
                    } else {
                        if (body.password) {
                            const salt = genSaltSync(10);
                            body.password = hashSync(body.password, salt);
                            db.query(`update users set username = ?, password = ?, email = ?, role = ?, adresse = ? where id = ?`, [body.username, body.password, body.email, body.role, body.adresse, id], (error, results) => {
                                if (error) {
                                    console.log(error);
                                }
                                if (results.affectedRows > 0) {
                                    return res.json("Updated successfully");
                                } else {
                                    return res.status(400).json({
                                        success: 0,
                                        message: "Failed to update"
                                    });
                                }
                            });
                        } else {
                            db.query(`update users set username = ?, email = ?, role = ?, adresse = ? where id = ?`, [body.username, body.email, body.role, body.adresse, id], (error, results) => {
                                if (error) {
                                    console.log(error);
                                }
                                if (results.affectedRows > 0) {
                                    return res.json("Updated successfully");
                                } else {
                                    return res.status(400).json({
                                        success: 0,
                                        message: "Failed to update"
                                    });
                                }
                            });
                        }
                    }
                });
            }
        });
    }
};