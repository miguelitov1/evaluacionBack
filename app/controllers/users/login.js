"use strict";

const Joi = require("joi");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const userRepository = require("../../repository/users");
const create_json_error = require("../errores/create_json_error");
// const { sendRegistrationEmail } = require("../../emial/sendGrid");
// const cryptoRandomString = require("crypto-random-string");

const schema = Joi.object().keys({
  email: Joi.string().email().required(),
  password: Joi.string().min(8).max(30).required(),
});

async function userLogin(req, res) {
  try {
    await schema.validateAsync(req.body);
    const { email, password } = req.body;

    const user = await userRepository.findUserByEmail(email);

    if (!user) {
      const error = new Error("El usuario o la contraseña no son correctos");
      error.status = 403;
      throw error;
    }

    // if (!user.verificateCode) {
    //   const error = new Error(
    //     "El usuario no ha sido verificado aún, hemos enviado un mail nuevamente a su cuenta para verificar su usuario"
    //   );
    //   const verificationCode = cryptoRandomString({ length: 64 });
    //   await enviarEmailDeRegistro(user.nombre, user.email, verificationCode);
    //   await userRepository.deleteOldVerificationCode(user.id);
    //   await userRepository.addVerificationCode(user.id, verificationCode);
    //   error.status = 403;
    //   throw error;
    // }

    const validatePassword = await bcrypt.compare(password, user.password);

    if (!validatePassword) {
      const error = new Error("El usuario o la contraseña no son correctos");
      error.status = 403;
      throw error;
    }

    const secret = process.env.JWT_SECRET;
    const { id, name, userName } = user;
    const jwtTokenExpiration = "30m";
    const payload = {
      id,
      name,
      userName,
    };

    const token = jwt.sign(payload, secret, { expiresIn: jwtTokenExpiration });

    const responde = {
      accessToken: token,
      expiresIn: jwtTokenExpiration,
    };

    res.send(responde);
  } catch (err) {
    create_json_error(err, res);
  }
}

module.exports = userLogin;
