const db = require('../../db/database');

module.exports = {
    AllProductsByUser: (req, res) => {
        const id = Number(req.params.id);
        db.query(`SELECT * FROM products WHERE UserID = ${id}`, (err, result) => {
            if (err) throw err;
            return res.json(result)
        });
    }
}