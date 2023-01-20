

module.exports = {
    logout : (req, res) => {
        res.cookie('token', '', { httpOnly: true });
        res.status(200).json("Logout success !");
    }
}