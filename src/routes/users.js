const express = require("express");
const router = express.Router();

const UserController = require("../controllers/users");

// Middlewares
const validateUser = require("../middlewares/validateUser"); 
const isOwnerOrAdmin = require("../middlewares/isOwnerOrAdmin"); 

router.get("/all", UserController.listAll); // Listar todos usuários
router.post("/register", UserController.create);    // Registrar
router.post("/auth", UserController.authenticate); // Logar

// Atualizar usuário
router.put(
  "/update/:userId",
  validateUser,
  isOwnerOrAdmin,
  UserController.update
);

// Deletar usuário
router.delete(
  "/delete/:userId",
  validateUser,
  isOwnerOrAdmin,
  UserController.delete
);

module.exports = router;
