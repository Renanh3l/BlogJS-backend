const userModel = require('../models/users');

/* 
    Middleware para validação de admins
    Verifica se a requisição veio de um usuário admin
*/

module.exports = async function validateAdmin(req, res, next) {
    const user = await userModel.findById(req.body.userId);

    if (user) {
        if (user.admin === true) {
            next();
        } else {
            res.json({
                status: "error",
                message: "Conta sem privilégios",
                data: null,
            })
        }
    }
};
