const db = require('../../db/database');
const jwt = require("jsonwebtoken");

module.exports = {
    deleteProducts: (req, res) => {
        const id = Number(req.params.id);
        let token = req.get('Authorization');

        // console.log(token);

        if (token) {
            token = token.slice(7);

            jwt.verify(token, "heheyou", (err, decoded) => {
                if (err) { throw err; }
                db.query(`SELECT * FROM products WHERE UserID = ${decoded.result[0].id}`, (err, result) => {
                    if (err) throw err;
                    if (result.length > 0) {
                        db.query(`DELETE FROM products WHERE id = ${id}`, (err, result) => {
                            if (err) throw err;
                            res.json({
                                status: 1,
                                message: 'Product deleted successfully'
                            });
                        });
                    }
                    else {
                        res.status(403).json({
                            status: 0,
                            message: "You can't delete the product from others !"
                        });
                    }
                });
            });

        }
    }
}
