const db = require('../../db/database');
const jwt = require('jsonwebtoken');

module.exports = {
    createProducts: (req, res) => {
        let data = req.body;
        console.log("data : ", data);
        let token = req.get("Authorization");
        // if field are empty
        if (!data.name || !data.price || !data.description || !data.image) {
            return res.status(400).json({
                success: 0,
                message: "Please enter all fields"
            });
        }
        else {
            if (token) {
                token = token.slice(7);
                jwt.verify(token, "heheyou", (err, decoded) => {
                    console.log("decoded : ", decoded.result[0]);
                    if (err) { throw err; }
                    db.query("INSERT INTO products SET name = ?, price=?, description=?, userID=?, image=?",
                        [
                            data.name,
                            data.price,
                            data.description,
                            decoded.result[0].id,
                            data.image
                            // add image

                        ],
                        (err, result) => {
                            if (err) { throw err; }
                            return res.json({
                                success: 1,
                                message: "Product created successfully"
                            });
                        });
                });
            }
        }
    }
}
