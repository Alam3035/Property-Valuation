const express = require('express');

class HistoricalTransactionRouter {
    constructor(historicalTransactionService) {
        this.historicalTransactionService = historicalTransactionService;
    }

    router() {
        let router = express.Router();

        //Historical Transaction data
        //get historical transaction data by district (root menu get request)
            router.get('/information/:rootID', (req, res) => {
                this.historicalTransactionService.listHistoricalTransactionsByDistrict(req.params.rootID)
                    .then((districtDetail) => res.json(districtDetail))
                    .catch((err) => res.status(500).json(err));
            })


        //get estate information
            router.get('/information/:catname', (req, res) => {
                this.historicalTransactionService.listHistoricalTransactionAverageEstatePrices(req.params.catname)
                    .then((estateDetail) => res.json(estateDetail))
                    .catch((err) => res.status(500).json(err));
            })


        //get detailed information
            router.get('/detail/:htID', (req, res) => {
                this.historicalTransactionService.getHistoricalTransactionDetail(req.params.htID)
                    .then((htDetail) => res.json(htDetail))
                    .catch((err) => res.status(500).json(err));
            })

        return router;
    }
}

module.exports = HistoricalTransactionRouter