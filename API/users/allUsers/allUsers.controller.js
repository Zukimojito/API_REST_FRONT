const db = require('../../db/database');

module.exports = {
    showAllUsers: (req, res) => {
        db.query(`select * from users`, (error, results) => {
            if (error) {
                console.log(error);
            }
            if (results.length > 0) {
                return res.json(results);
            } else {
                return res.status(204).json({
                    success: 0,
                    message: "Record not found"
                });
            }
        });
    }
}