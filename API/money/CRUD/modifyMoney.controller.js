const db = require('../../db/database');
const jwt = require('jsonwebtoken');

module.exports = {
    modifyMoney: (req, res) => {
        let data = req.body;
        const id = req.params.id;

        console.log("data : ", data);
        console.log("id : ", id);

        db.query("UPDATE users SET money = ? WHERE id = ?",
            [
                data.montant,
                id
            ],
            (err, result) => {
                if (err) { throw err; }
                return res.json({
                    success: 1,
                    message: "Money modified successfully"
                });
            });
    }
}