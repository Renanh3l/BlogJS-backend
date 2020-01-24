const userModel = require('../models/users');

/* 
    Middleware para validação de dono ou admin
    Verifica se a requisição veio do próprio usuário ou um admin
*/

module.exports = async function isOwnerOrAdmin(req, res, next) {
    const user = await userModel.findById(req.body.userId);

    if (user) {
        if (user.admin === true) {
            next();
        } else {
            if (req.body.userId === req.params.userId) {
                next();
            } else {
                res.json({
                    status: "error",
                    message: "Conta sem privilégios",
                    data: null,
                })
            }
        }
    }
};
