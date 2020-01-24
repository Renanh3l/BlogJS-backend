const postModel = require("../models/posts");

/* 
    Middleware para validação de autor do Post
    Verifica se a requisição veio a partir do autor do Post
*/

module.exports = async function validatePost(req, res, next) {
  const postOwner = await postModel.findById(req.params.postId);

  if (req.body.userId === postOwner.owner) {
    next();
  } else {
    res.json({
      status: "error",
      message: "Você não é o autor deste post!",
      data: null
    });
  }
};
