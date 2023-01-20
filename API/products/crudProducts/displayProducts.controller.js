const db = require('../../db/database');

module.exports = {
    displayProducts: (req, res) => {
        const id = req.params.id;

        db.query(`SELECT * FROM products WHERE id = ${id}`, (err, result) => {
            if (err) {
                console.log(err);
            } else if (result.length === 0) {
                res.status(404).send('Product not found');
            }
            else {
                res.json(result[0]);
            }
        });
    }
}