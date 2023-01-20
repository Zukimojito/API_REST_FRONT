const db = require('../../db/database');

module.exports = {
    readMoney: (req, res) => {

        const id = req.params.id;
        let data = req.body;

        console.log("data : ", data);

        db.query(`SELECT money FROM users WHERE id = ${id}`, (err, result) => {
            if (err) {
                console.log(err);
            } else if (result.length === 0) {
                res.status(404).send('Money not found');
            }
            else {
                res.json(result[0]);
            }
        });
    }
}