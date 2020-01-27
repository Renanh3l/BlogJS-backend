const postModel = require("../models/posts"); 
const userModel = require("../models/users"); 

module.exports = {

  pageNumbers: async function(req, res, next) {
    const pageLimit = 6;
    const posts = await postModel.find({});

    const maxPages = parseInt(posts.length / pageLimit + 1);
    
    return res.json({
      status: "success",
      data: maxPages,
    });
  },

  index: async function(req, res, next) {
    const pageLimit = 6;

    const posts = await postModel
      .find({})
      .sort('-createdAt')
      .limit(pageLimit)
      .skip((req.params.page - 1) * pageLimit);

    return res.json(posts);
  },

  listAll: async function(req, res, next) {
    await postModel.find((err, post) => {
      if (err) {
        return res.json({
          status: "error",
          message: err,
          data: null
        });
      } else {
        return res.json(post);
      }
    });
  },

  create: async function(req, res, next) {

    const {name, avatarURL} = await userModel.findById(req.body.userId);

    await postModel.create(
      {
        title: req.body.title,
        description: req.body.description,
        content: req.body.content,
        bannerURL: req.body.bannerURL,
        owner: {id: req.body.userId, name, avatarURL}
      },
      function(err, result) {
        if (err) {
          next();
        } else {
          res.json({
            status: "success",
            message: "Post adicionado com sucesso!",
            data: null
          });
        }
      }
    );
  },

  update: async function(req, res, next) {
    await postModel.findByIdAndUpdate(
      req.params.postId,
      {
        title: req.body.title,
        description: req.body.description,
        content: req.body.content
      },
      (err, postInfo) => {
        if (err) {
          res.json({
            status: "error",
            message: err,
            data: null
          });
        } else {
          res.json({
            status: "success",
            message: "Post atualizado com sucesso!",
            data: null
          });
        }
      }
    );
  },

  delete: async function(req, res, next) {
    await postModel.findByIdAndDelete(req.params.postId, (err, info) => {
      if (err) {
        res.json({
          status: "error",
          message: err,
          data: null
        });
      } else {
        res.json({
          status: "success",
          message: "Post deletado com sucesso!",
          data: null
        });
      }
    });
  },

  addComment: async function(req, res, next) {
    await postModel.findById(req.params.postId, async (err, post) => {
      if (err) {
        res.json({
          status: "error",
          message: err,
          data: null
        });
      } else {
        if (post) {
          // post encontrado
          await post.update(
            {
              comments: [
                ...post.comments,
                {
                  body: req.body.body,
                  owner: req.body.userId,
                  likes: 0,
                  date: Date.now()
                }
              ]
            },
            function(err, info) {
              if (err) {
                res.json({
                  status: "error",
                  message: err,
                  data: null
                });
              } else {
                res.json({
                  status: "success",
                  message: "Comentário adicionado com sucesso!",
                  data: null
                });
              }
            }
          );
        }
      }
    });
  }
};
