const userService = require('../services/user.service');
const express = require('express');
const router = express.Router();

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
