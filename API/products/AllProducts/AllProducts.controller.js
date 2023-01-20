const db = require('../../db/database');


module.exports = {
    AllProducts: (req, res) => {
        db.query("SELECT * FROM products", (err, result) => {
            if (err) throw err;

            if (result.length > 0) {
                return res.json(result)
            } else {
                return res.status(204).json({
                    success: 0,
                    message: "There is no products"
                });
            }
        });
    }
}