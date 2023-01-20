const checkToken = require("jsonwebtoken");

module.exports = {
    checkToken: (req, res, next) => {
        let token = req.get("Authorization");
        const id = Number(req.params.id);
        if (token) {
            token = token.slice(7);
            checkToken.verify(token, "heheyou", (err, decoded) => {
                if (err) {
                    return res.status(403).json({
                        success: 0,
                        message: "Invalid token"
                    });
                } else {
                    // si l'utilisateur est admin ou c'est son propre compte
                    if (decoded.result[0].role === 1 || decoded.result[0].id === id) {
                        next();
                    } else {
                        return res.status(401).json({
                            success: 0,
                            message: "You are not allowed !"
                        });
                    }
                }
            });
        } else {
            return res.status(403).json({
                success: 0,
                message: "Access denied! Unauthorized user"
            });
        }
    }
}