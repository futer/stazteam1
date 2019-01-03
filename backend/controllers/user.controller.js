const userService = require('../services/user.service');
const express = require('express');
const router = express.Router();


/**
 * @swagger
 * /users/register:
 *   post:
 *     tags:
 *       - users
 *     description: Returns all users
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: An array of users
 *         schema:
 *           $ref: '#/definitions/users'
 */

router.post('/register', register);

module.exports = router;

function register(req,res,next){
    userService.registrationLocal(req.body)
    .then(() => res.json({}))
    .catch((err) => {
       res.status(500);
       res.json({
           message: err.message,
           status: err.status,
           name: err.name,
       });
    })
}
