const fs = require('fs');
const multer = require('multer');
// import fs from '../image'

const storage = multer.diskStorage({
    destination: '../image',
    filename: (req, file, cb) => {
        cb(null, file.originalname);
    }
});
const upload = multer({ storage: storage });




// module.exports = {
//     UploadImage: (req, res) => {
//         const image = req.body.image;

//         console.log("image : ", image);
//         if (image) {
//             fs.writeFileSync('../images/image.png', image);
//             res.send('L\'image a été enregistrée avec succès!');
//         } else {
//             res.status(400).json("Veuillez envoyer une image LOOOOOOOOOOOOOL")
//         }
//     }
// }