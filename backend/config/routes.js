(function () {
    'use strict';

    const express = require('express');
    const auth = require('./auth');

    module.exports = function (server) {

        /*
         * Rotas abertas 
         */
        const openApi = express.Router();
        server.use('/oapi', openApi);

        const authService = require('../api/user/authService');
        openApi.post('/login', authService.login);
        openApi.post('/signup', authService.signup);
        openApi.post('/validateToken', authService.validateToken);

        //API routers
        const protectedApi = express.Router();
        server.use('/api', protectedApi);

        protectedApi.use(auth);

        //Rotas da API
        const billingCycleService = require('../api/billingCycle/billingCycleService');
        billingCycleService.register(protectedApi, '/billingCycles');

        const billingSummaryService = require('../api/billingSummary/billingSummaryService');
        protectedApi.route('/billingSummary').get(billingSummaryService.getSummary);
    }

})();