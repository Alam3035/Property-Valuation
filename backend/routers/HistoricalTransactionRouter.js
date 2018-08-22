const express = require('express');

class HistoricalTransactionRouter {
    constructor(historicalTransactionService) {
        this.historicalTransactionService = historicalTransactionService;
    }

    router() {
        let router = express.Router();

        //Historical Transaction data
        //get historical transaction data by district (root menu get request)
            router.get('/rootID/:rootID', (req, res) => {
                console.log('hhdddh')

                this.historicalTransactionService.listHistoricalTransactionsByDistrict(req.params.rootID)
                    .then((districtDetail) => res.json(districtDetail))
                    .catch((err) => res.status(500).json(err));
            })


        //get estate information err fro spaces in requests try + or \
            router.get('/estate/:catname', (req, res) => {
                console.log(req.params.catname)
                this.historicalTransactionService.listHistoricalTransactionAverageEstatePrices(req.params.catname)
                    .then((estateDetail) => res.json(estateDetail))
                    .catch((err) => res.status(500).json(err));
            })


        //get detailed information err
            router.get('/details/:htID', (req, res) => {
                this.historicalTransactionService.getHistoricalTransactionDetail(req.params.htID)
                    .then((htDetail) => res.json(htDetail))
                    .catch((err) => res.status(500).json(err));
            })

        return router;
    }
}

module.exports = HistoricalTransactionRouter