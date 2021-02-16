"use strict";

const fs = require("fs");
const uuid = require("uuid");

const users = JSON.parse(fs.readFileSync("app/json/users.json", "utf-8")); //leo el archivo JSON con el fs y lo convierto en el array

// async function addVerificationCode(id, code) {
//   const users2 = users.map((user) => {
//     if (user.id === id) {
//       user.verificationCode = code;
//     }
//     return user;
//   });
//   const json_users = JSON.stringify(users2);
//   fs.writeFileSync("app/json/users.json", json_users, "utf-8");

//   return users2;
// }

async function createUser(name, surname, email, passwordHash, userName) {
  const userId = users.push({
    id: uuid.v4(),
    name,
    surname,
    email,
    password: passwordHash,
    userName,
    // verificationCode: "",
    // verificationDate: "",
  });

  const user = users[userId - 1];

  const json_users = JSON.stringify(users);
  fs.writeFileSync("app/json/users.json", json_users, "utf-8");

  return user;
}

async function deleteUser(id) {
  users = users.filter((user) => user.id !== id);
  const json_users = JSON.stringify(users);
  fs.writeFileSync("app/json/users.json", json_users, "utf-8");
  return true;
}

async function findUserByEmail(email) {
  return users.find((person) => person.email === email);
}

async function findUserByUserName(userName) {
  return users.find((person) => person.userName === userName);
}

module.exports = {
  // addVerificationCode,
  createUser,
  findUserByEmail,
  findUserByUserName,
};
