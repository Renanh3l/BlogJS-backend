var jwt = require("jsonwebtoken");

/* 
    Middleware para validação de usuário
    Verifica se a requisição veio de um usuário logado
*/

module.exports = function validateUser(req, res, next) {
  jwt.verify(req.headers["x-access-token"], req.app.get("secretKey"), function(
    err,
    decoded
  ) {
    if (err) {
      res.json({ status: "error", message: err.message, data: null });
    } else {
      // add user id to request
      req.body.userId = decoded.id;
      next();
    }
  });
};
