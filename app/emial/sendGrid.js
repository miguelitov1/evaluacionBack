// "use strict";

// const sgMail = require("@sendgrid/mail");

// async function sendRegistrationEmail(name, email, verificationCode) {
//   try {
//     const {
//       HTTP_SERVER_DOMAIN,
//       SENDGRID_KEY,
//       SENDGRID_MAIL_FROM,
//     } = process.env;

//     sgMail.setApiKey(SENDGRID_KEY);

//     const linkActivacion = `${HTTP_SERVER_DOMAIN}/api/v1/got/activacion?codigo_verificacion=${verificationCode}`;

//     const contentEmail = {
//       to: email,
//       from: SENDGRID_MAIL_FROM,
//       subject: "Bienvenido a Got",
//       text: `Hola ${name}.\nBienvenido a GOT.\nPara continuar operando en nuestra web, es necesario que confirme su usuario ${linkActivacion}`,
//       html: `<h1>Hola ${name}.</h1><p>Bienvenido a GOT.</p><p>Para continuar operando en nuestra web, es necesario que confirme su usuario ${linkActivacion}</p>`,
//     };

//     await sgMail.send(contentEmail);
//   } catch (error) {
//     console.log(error);
//   }
// }

// module.exports = {
//   sendRegistrationEmail,
// };
