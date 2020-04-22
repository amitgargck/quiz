const express = require("express");
const router = express.Router();

const {
    create,
    quizById,
    read,
    update,
    remove,
    list,
    photo
} = require("../controllers/quiz");
const { requireSignin, isAuth, isAdmin } = require("../controllers/auth");
const { userById } = require("../controllers/user");

router.get("/quiz/:quizId", read);
router.post("/quiz/create/:userId", requireSignin, isAuth, isAdmin, create);
router.put(
    "/quiz/:quizId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    update
);
router.delete(
    "/quiz/:quizId/:userId",
    requireSignin,
    isAuth,
    isAdmin,
    remove
);
router.get("/quiz", list);
router.get("/quiz/photo/:quizId", photo);

router.param("quizId", quizById);
router.param("userId", userById);

module.exports = router;
