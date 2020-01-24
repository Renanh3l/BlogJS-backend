const userModel = require("../models/users");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

module.exports = {

  listAll: async function(req, res, next) {
    await userModel.find((err, user) => {
      if (err) {
        res.json({
          status: "error",
          message: err,
          data: null
        });
      } else {
        res.json(user);
      }
    });
  },

  create: async function(req, res, next) {

    await userModel.findOne({email: req.body.email}, async function(err, user) {
      if (err) {
        res.json({
          status: "error",
          message: err,
          data: null
        });
      } else {
        if (user) {
          res.json({
            status: "error",
            message: "Email já cadastrado",
            data: null,
          });
        } else {
          await userModel.create(
            {
              name: req.body.name,
              email: req.body.email,
              password: req.body.password
            },
            function(err, result) {
              if (err) {
                next();
              } else {
                res.json({
                  status: "success",
                  message: "Usuário adicionado com sucesso!",
                  data: null
                });
              }
            }
          );
        }
      }
    });
  },

  authenticate: async function(req, res, next) {
    const { email, password } = req.body;

    await userModel.findOne({ email }, function(err, userInfo) {
      if (err) {
        next();
      } else {
        // Usuário encontrado, testar informações
        try {

          // compara a senha do input com a senha do banco de dados encriptada
          if (bcrypt.compareSync(password, userInfo.password)) {
            const token = jwt.sign(
              { id: userInfo._id },
              req.app.get("secretKey"),
              { expiresIn: "1hr" }
            );

            res.json({
              status: "success",
              message: "Usuário encontrado!",
              data: { user: userInfo, token: token }
            });
          } else {
            // Usuário e senha não batem
            res.json({
              status: "error",
              message: "Email ou senha inválidos!",
              data: null
            });
          }
        } catch (err) {
          res.json({
            status: "error",
            message: "Email ou senha inválidos!",
            data: null
          });
        }
      }
    });
  },

  update: async function(req, res, next) {
    await userModel.findByIdAndUpdate(
      req.params.userId,
      {
        name: req.body.name
      },
      { setDefaultsOnInsert: true },
      (err, userInfo) => {
        if (err) {
          res.json({
            status: "error",
            message: err,
            data: null
          });
        } else {
          res.json({
            status: "success",
            message: "Usuário atualizado com sucesso!",
            data: null
          });
        }
      }
    );
  },

  delete: async function(req, res, next) {
    await userModel.findByIdAndDelete(req.params.userId, (err, result) => {
      if (err) {
        res.json({
          status: "error",
          message: err,
          data: null
        })
      } else {
        res.send(result);
      }
    })
  }
};
