const userService = require('../services/user.service');
const express = require('express');
const router = express.Router();
const User = require('../models/user.model');
const jwt = require('jsonwebtoken')

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
router.get('/isAdmin', isAdmin);
router.get('/isEditor', isEditor);
router.get('/isModerator', isModerator);
router.get('/isReviewer', isReviewer);
router.get('/getCurrentUser', getCurrentUser);
router.post('/socialAuthenticate', socialAuthenticate)
router.post('/disconnect', disconnect)
router.post('/disconnect_delete', disconnect_delete)
router.post('/disconnect_local', disconnect_local)
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
    userService.getById(req.body.id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function getCurrentUser(req,res,next){
    userService.getCurrent(jwt.decode(req.get('Authorization').slice(7)).sub._id)
        .then(user => user ? res.json(user) : res.sendStatus(404))
        .catch(err => next(err));
}

function authenticate(req,res,next){
    userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Email or password incorrect'}))
        .catch(err => res.status(err.status).json({message: err.name}));
}

function socialAuthenticate(req,res,next){
    userService.socialAuthenticate(req.body.payload.payload)
        .then(user => res.json(user))
        .catch(err => res.status(err.status).json({message: err.name}));
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


function isAdmin(req,res,next) {
    userService.isAdmin(req.get('Authorization').slice(7))
        .then(admin => res.json(admin))
        .catch(err => next(err));
}

function isEditor(req,res,next) {
    userService.isEditor(req.get('Authorization').slice(7))
        .then(editor => res.json(editor))
        .catch(err => next(err));
}

function isReviewer(req,res,next) {
    userService.isReviewer(req.get('Authorization').slice(7))
        .then(reviewer => res.json(reviewer))
        .catch(err => next(err));
}

function isModerator(req,res,next) {
    userService.isModerator(req.get('Authorization').slice(7))
        .then(moderator => res.json(moderator))
        .catch(err => next(err));
}

function disconnect(req,res,next) {
    userService.disconnect(req.body)
        .then(resp => { res.json(resp) })
        .catch(err => { res.json(err) });
}

function disconnect_delete(req,res,next) {
    userService.disconnect_delete(req.body)
        .then(resp => { res.json(resp) })
        .catch(err => { res.json(err) });
}

function disconnect_local(req,res,next) {
    userService.disconnect_local(req.body)        
        .then(resp => { res.json(resp) })
        .catch(err => { res.json(err) });
}
