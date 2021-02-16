"use strict";

const validAuth = require("../middleware/validAuth");
const express = require("express");
const router = express.Router();

const getGot = require("../controllers/got/index");
const register = require("../controllers/users/register");
const login = require("../controllers/users/login");

//PUBLICAS:
//pagina de registro
router.route("/register").post((req, res) => register(req, res));
// //pagina de login
router.route("/login").post((req, res) => login(req, res));

//ver jason got
router
  .route("/")
  .all(validAuth)
  .get((req, res) => getGot(req, res));

router
  .route("/books")
  .all(validAuth)
  .get((req, res) => getGot(req, res));

router
  .route("/characters")
  .all(validAuth)
  .get((req, res) => getGot(req, res));

router
  .route("/houses")
  .all(validAuth)
  .get((req, res) => getGot(req, res));

router
  .route("/delet")
  .all(validAuth)
  .get((req, res) => getGot(req, res));

module.exports = router;
