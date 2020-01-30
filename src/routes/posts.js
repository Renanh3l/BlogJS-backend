const express = require("express");
const router = express.Router();

// middlewares
const validateUser = require("../middlewares/validateUser");
const validateAdmin = require("../middlewares/validateAdmin");

const PostController = require("../controllers/posts");

router.post("/new", validateUser, validateAdmin, PostController.create);  // Criar novo post
router.get("/all", PostController.listAll); // Listar todos os posts

// Pegar o máximo de páginas disponíveis
router.get("/pageNumbers", PostController.pageNumbers);
router.get("/blog/:page", PostController.index); // Listar posts por páginas

// Pegar post por id
router.get("/:postId", PostController.getById);

router.put(
  "/update/:postId",
  validateUser,
  validateAdmin,
  PostController.update
);
router.delete(
  "/delete/:postId",
  validateUser,
  validateAdmin,
  PostController.delete
);

router.put("/comment/:postId", validateUser, PostController.addComment);

module.exports = router;
