const userService = require('../services/user.service');
const express = require('express');
const router = express.Router();

/**
 * @swagger
 * /users/register:
 *   post:
 *     tags:
 *       - Local registration
 *     description: Registers user
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: User registered
 *         schema:
 *           $ref: '#/models/user.model.js'
=
*/

router.post('/register', register);
router.get('/getbyid', getById);
router.get('/authenticate', authenticate)
module.exports = router;

function register(req,res,next){
    console.log(req.body)
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

function getById(req,res,next){
    userService.getById(req.body).then(user => user ? res.json(user) : res.sendStatus(404)).catch(err => next(err));
}

function authenticate(req,res,next){
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Email or password incorrect'}))
        .catch(err => next(err));
}
