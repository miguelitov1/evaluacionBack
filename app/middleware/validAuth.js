"use strict";

const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

function validAuth(req, res, next) {
  try {
    const { authorization } = req.headers;

    if (!authorization || authorization.startsWith("Beared")) {
      const error = new Error("Autorizacion requerida");
      error.status = 403;
      throw error;
    }
    const accessToken = authorization.split(" ")[1];

    const playload = jwt.verify(accessToken, JWT_SECRET);
    const { id, name, userName } = playload;
    req.auth = { id, name, userName };

    next();
  } catch (err) {
    res.status(401);
    res.send({ error: err.message });
  }
}
module.exports = validAuth;
