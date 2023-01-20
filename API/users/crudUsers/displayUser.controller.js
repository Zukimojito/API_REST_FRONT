const db = require('../../db/database');


module.exports = {
    dislayUserById: (req, res) => {
        const id = Number(req.params.id);

        if (!id) {
            return res.status(204).json({
                success: 0,
                message: "Id is required"
            });
        } else {
            db.query(`select * from users where id = ?`, [id], (error, results) => {
                if (error) {
                    console.log(error);
                }
                if (results.length > 0) {
                    return res.json({
                        success: 1,
                        data: results
                    });
                } else {
                    return res.status(404).json({
                        success: 0,
                        message: "Record not found"
                    });
                }
            });
        }
    }
}