const express = require("express");
const router = express.Router();

const {
    create,
    subcategoryById,
    read,
    update,
    remove,
    list,
    photo
} = require("../controllers/subcategory");

const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get("/subcategory/:subcategoryById", read);
router.post("/subcategory/create/:userId", requireSignin, isAuth, isAdmin, create);
router.put(
    "/subcategory/:subcategoryById/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    update
);
router.delete(
    "/subcategory/:subcategoryById/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);
router.get("/subcategories", list);
router.get("/subcategory/photo/:subcategoryById", photo);
router.param("subcategoryById", subcategoryById);
router.param("userId", userById);

module.exports = router;
