"use strict";

const Joi = require("joi");
const userRepository = require("../../repository/users");
const create_json_error = require("../errores/create_json_error");

const schema = Joi.number().positive();

async function deleteUser(req, res) {
  try {
    const idUsuario = req.auth.id;
    await schema.validateAsync(idUsuario);
    const data = await userRepository.deleteUser(idUsuario);
    //tendria que borrar el token aqui, porque sino el usuario puede serguir haciendo cosas privadas.

    res.status(204).send(data);
  } catch (err) {
    create_json_error(err, res);
  }
}

module.exports = deleteUser;
