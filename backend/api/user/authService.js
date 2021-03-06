(function () {
    'use strict';

    const _ = require('lodash');
    const jwt = require('jsonwebtoken');
    const bcrypt = require('bcrypt');
    const User = require('./user');
    const env = require('../../.env');

    const emailRegex = /\S+@\S+\.\S+/;
    const passwordRegex = /((?=.*\d)(?=.*[a-z]).{6,12})/;
    const tokenTime = "1 day";

    function sendErrorsFromDB(res, dbErrors) {
        const errors = [];
        _.forIn(dbErrors.errors, error => errors.push(error.message));
        return res.status(400).json({ errors });
    }

    function login(req, res, next) {
        const email = req.body.email || ''
        const password = req.body.password || ''
        User.findOne({ email }, (error, user) => {
            if (error) {
                return sendErrorsFromDB(res, error);
            } else if (user && bcrypt.compareSync(password, user.password)) {
                const token = jwt.sign(user, env.authSecret, {
                    expiresIn: tokenTime
                });
                const { name, email } = user;
                res.json({ name, email, token });
            } else {
                return res.status(400).send({ errors: ['Usuário/Senha inválidos'] });
            }
        })
    }

    function validateToken(req, res, next) {
        const token = req.body.token || '';
        jwt.verify(token, env.authSecret, function (error, decoded) {
            return res.status(200).send({ valid: !error });
        });
    }

    const signup = (req, res, next) => {
        const name = req.body.name || '';
        const email = req.body.email || '';
        const password = req.body.password || '';
        const confirmPassword = req.body.confirm_password || '';
        if (!email.match(emailRegex)) {
            return res.status(400).send({
                errors: ['O e-mail informado está inválido']
            })
        }
        if (!password.match(passwordRegex)) {
            return res.status(400).send({
                errors: ['Senha precisar ter: uma letra maiúscula, uma letra minúscula, um número e tamanho entre 6- 12.']
            });
        }
        const salt = bcrypt.genSaltSync();
        const passwordHash = bcrypt.hashSync(password, salt);
        if (!bcrypt.compareSync(confirmPassword, passwordHash)) {
            return res.status(400).send({ errors: ['Senhas não conferem.'] });
        }
        User.findOne({ email }, (error, user) => {
            if (error) {
                return senderrororsFromDB(res, error);
            } else if (user) {
                return res.status(400).send({ errors: ['Usuário já cadastrado.'] });
            } else {
                const newUser = new User({ name, email, password: passwordHash });
                newUser.save(error => {
                    if (error) {
                        return sendErrorsFromDB(res, error);
                    } else {
                        login(req, res, next);
                    }
                });
            }
        });
    }

    module.exports = { login, signup, validateToken };
})();