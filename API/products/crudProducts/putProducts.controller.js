const db = require('../../db/database');
const jwt = require('jsonwebtoken');

module.exports = {
    putProducts: (req, res) => {
        const id = req.params.id;
        const body = req.body;
        let token = req.get('Authorization');

        if (!body.name || !body.price || !body.description) {
            return res.status(400).json({
                status: 0,
                message: 'Please enter all fields'
            });
        }

        if (token) {
            token = token.slice(7);
            jwt.verify(token, "heheyou", (err, decoded) => {
                if (err) { throw err; }
                db.query(`SELECT * FROM products WHERE UserID = ${decoded.result[0].id}`, (err, result) => {
                    if (err) throw err;
                    if (result.length > 0) {
                        db.query('UPDATE products SET name = ?, price = ?, description = ?, UserID = ?, image = ? WHERE id = ?', [body.name, body.price, body.description, decoded.result[0].id, body.image, id], (err, result) => {
                            if (err) {
                                return res.status(500).json({
                                    status: 0,
                                    message: err
                                });
                            }
                            res.status(200).json({
                                status: 1,
                                message: 'Product updated successfully'
                            });
                        });
                    }
                    else {
                        res.status(403).json({
                            status: 0,
                            message: "it is not your product !"
                        });
                    }
                });
            });
        }
    }
}