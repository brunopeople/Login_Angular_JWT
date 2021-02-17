const express = require("express");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const router = express.Router();
const userSchema = require("../models/User");


//

router.post("/register-user", (req, res, next) => {
    bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new userSchema({
            name: req.body.name,
            email: req.body.email,
            password:hash
        });

        user.save().then((response) => {
            res.status(201).json({
                message: "Usuário criado com sucesso!",
                result: response
            });
        }).catch(error => {
            res.status(500).json({
                error: error
            });
        });
    });
});

router.post("/signin", (req, res,next) =>{
    let getUSer;
    userSchema.findOne({
        email: req.body.email
    }).then(user => {
        if(!user){
            return res.status(401).json({
                message: "Autenticação falhou!"
            });
        }

        let jwtToken = jwt.sign({
            email: getUSer.email,
            userId: getUSer._id
        }, "longer-secret-is-better", {
            expiresIn: "1h"
        });
        res.status(200).json({
            token: jwtToken,
            expiresIn: 3600,
            msg: getUSer
        });
    }).catch(err => {
        return res.status(401).json({
            message: "Autenticação Falhou!"
        });
    });
});

router.route('/').get((req, res) => {
    userSchema.find((error, response) => {
        if(error){
            return next(error)
        } else{
            res.status(200).json(response)
        }
    })
})

router.route('./user-profile/id:').get((req,res, next) => {
    userSchema.findById(req.params.id, (error,data) => {
        if(error){
            return next(error);
        } else {
            res.status(200).json({
                msg: data
            })
        }
    })
})

router.route('/update-user/:id').put((req, res, next) => {
    userSchema.findByIdAndUpdate(req.params.id, {
        $set: req.body
    }, (error, data) => {

        if(error) {
        return next(error);
        console.log(error)
    } else {
        res.json(data)
        console.log('Usuário atualizado com sucesso!')
        }
    })
})

router.route('/delete-user/:id').delete((req,res, next) => {
    userSchema.findByIdAndRemove(req.params.id, (error,data) => {
        if(error){
            return next(error);
        } else {
            res.status(200),json({
                msg: data
            })
        }
    })
})

module.exports = router;