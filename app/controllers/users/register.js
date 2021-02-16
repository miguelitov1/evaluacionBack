"use strict";

const Joi = require("joi");
const bcrypt = require("bcryptjs");
// const cryptoRandomString = require("crypto-random-string");

const usersRepository = require("../../repository/users");
// const { sendRegistrationEmail } = require("../../emial/sendGrid");
const creatJsonError = require("../errores/create_json_error");

const schema = Joi.object().keys({
  name: Joi.string()
    .regex(/^[ A-Za-zÁÉÍÓÚáéíóúÑñ]+$/)
    .required(),
  surname: Joi.string()
    .regex(/^[ A-Za-zÁÉÍÓÚáéíóúÑñ]+$/)
    .required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(20).required(),
  repeatedPassword: Joi.ref("password"),
  userName: Joi.string().alphanum().min(3).max(30).required(),
});

async function userRegistration(req, res) {
  try {
    await schema.validateAsync(req.body);

    const {
      name,
      surname,
      email,
      password,
      repeatedPassword,
      userName,
    } = req.body;

    const existEmail = await usersRepository.findUserByEmail(email);
    if (existEmail) {
      const error = new Error("Ya existe un usuario con ese email");
      error.status = 409;
      throw error;
    }

    const existUserName = await usersRepository.findUserByUserName(userName);
    if (existUserName) {
      const error = new Error("El nombre de usuario ya está en uso");
      error.status = 409;
      throw error;
    }

    const passwordHash = await bcrypt.hash(password, 12);

    const user = await usersRepository.createUser(
      name,
      surname,
      email,
      passwordHash,
      userName
    );

    // const verificationCode = cryptoRandomString({ length: 64 });
    // await sendRegistrationEmail(name, email, verificationCode);
    // await usersRepository.addVerificationCode(user.id, verificationCode);

    const { password: pass, id: idUser, ...info } = user;
    res.status(201).send({ info });
  } catch (err) {
    creatJsonError(err, res);
  }
}

module.exports = userRegistration;
