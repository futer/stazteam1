const userService = require('../services/user.service');
const express = require('express');
const router = express.Router();
const User = require('../models/user.model');

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
router.post('/authenticate', authenticate)
router.put('/:id/edit', editUser)
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

function getById(req,res,next){
    userService.getById(req.body.id).then(user => user ? res.json(user) : res.sendStatus(404)).catch(err => next(err));
}

function authenticate(req,res,next){
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Email or password incorrect'}))
        .catch(err => next(err));
}

function editUser(req,res,next){
    const updatedData = {
        firstName: req.params.firstName,
        lastName: req.params.lastName,
        password: req.params.password,
        pic: req.params.pic
    };
    User.findByIdAndUpdate(req.params.id, {
        $set: updatedData},
        function(err, user){
            if(err) return next(err);
        res.send('user updated');
        });


}
