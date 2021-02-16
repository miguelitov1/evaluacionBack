"use strict";

require("dotenv").config();
const express = require("express");

const app = express();

// app.use(express.urlencoded({ extended: false })); //convierte los datos que vienen desde el formulario y lo convierten en JSON
app.use(express.json());

const routes = require("./app/routes/routes");
app.use("/api/v1/got", routes);

app.use((req, res, next) => {
  res.status(404).send("404 not found");
});

module.exports = app;
