const router = require('express').Router();

//All Users controller
const { registerUser } = require('../users/register/register.controller');
const { loginUser } = require('../users/login/login.controller');
const { showData } = require('../users/me/me.controller');
const { showAllUsers } = require('../users/allUsers/allUsers.controller');
const { dislayUserById } = require('../users/crudUsers/displayUser.controller');
const { modifyUserById } = require('../users/crudUsers/modifyUser.controller');
const { deleteUserById } = require('../users/crudUsers/deleteUser.controller');
const { checkToken } = require('../users/auth/token');
const { logout } = require('../users/logout/logout.controller');

//All Products controller
const { createProducts } = require('../products/crudProducts/createProducts.controller');
const { CheckLogin } = require('../products/Middleware/CheckLogin');
const { displayProducts } = require('../products/crudProducts/displayProducts.controller');
const { putProducts } = require('../products/crudProducts/putProducts.controller');
const { deleteProducts } = require('../products/crudProducts/deleteProducts.controller');
const { AllProducts } = require('../products/AllProducts/allProducts.controller');
const { AllProductsByUser } = require('../products/AllProductsByUser/allProductsByUser.controller');
const { UploadImage } = require('../products/uploadImage/uploadImage.controller');

// Money controller
const { readMoney } = require('../money/CRUD/readMoney.controller');
const { modifyMoney } = require('../money/CRUD/modifyMoney.controller');

router.get("/", (req, res) => {
    res.json({
        success: 1,
        message: "Welcome to my API"
    });
});
// All Users router
router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/me", showData);
router.get("/users", checkToken, showAllUsers);
router.get("/user/:id", checkToken, dislayUserById);
router.put("/user/:id", checkToken, modifyUserById);
router.delete("/user/:id", checkToken, deleteUserById);
router.get("/logout", logout);

// All Products router
router.post("/product/create", CheckLogin, createProducts);
router.get("/product/:id", CheckLogin, displayProducts);
router.put("/product/:id", CheckLogin, putProducts);
router.delete("/product/:id", CheckLogin, deleteProducts);
router.get("/products", AllProducts);
router.get("/products/:id", AllProductsByUser);
// router.post("/product/uploadImage", UploadImage);

// Money router
router.put("/money/:id", modifyMoney);
router.get("/money/:id", readMoney);

// export routeur
module.exports = router;
