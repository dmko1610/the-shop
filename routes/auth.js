const express = require("express");

const authController = require("../controllers/auth");

const router = express.Router();

router.get("/login", (req, res, next) => authController.getLogin);

module.exports = router;
