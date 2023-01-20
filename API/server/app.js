require("dotenv").config();
const express = require("express");
const app = express();
const Routeur = require('../routeur/routeur');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const multer = require('multer');

const storage = multer.diskStorage({
    destination: '../Front/src/assets',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });

//convert to format json
app.use(express.json());
app.use(cors());
app.use(cookieParser());
// All routeur HERE !!!!!!!!!!!!!!!!!
app.use('/', Routeur);


app.post("/product/uploadImage", upload.single('image'), (req, res) => {
    console.log("req.file : ", req.file);
    res.json({ message: "L'image a été enregistrée avec succès!" });
});


// Open server on port 3000
app.listen(process.env.APP_PORT, () => {
    console.log('Server is running on port : ', (process.env.APP_PORT));
});