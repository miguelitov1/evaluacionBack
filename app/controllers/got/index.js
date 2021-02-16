"use strict";

const Joi = require("joi");

const gotRepository = require("../../repository/got");
const create_json_error = require("../errores/create_json_error");

const schema = Joi.string();

async function getGot(req, res) {
  try {
    const url = req.url;
    const data = await gotRepository.getGot(url);

    res.status(200).send(data);
  } catch (err) {
    create_json_error(err, res);
  }
}

module.exports = getGot;
