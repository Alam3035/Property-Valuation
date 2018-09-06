const express = require('express');

class HistoricalTransactionRouter {
    constructor(historicalTransactionService) {
        this.historicalTransactionService = historicalTransactionService;
    }

    router() {
        let router = express.Router();

        //Historical Transaction data
        //list histroical transactions per re_id giving an empty object
        router.get('/listre/:reID', (req, res) => {
            console.log('list by reID')

            this.historicalTransactionService.listHistoricalTransactionByRealEstate(req.params.reID, req.query.page, req.query.numberOfResults)
                .then((listDetails) => res.json(listDetails))
                .catch((err) => res.status(500).json(err));
        })

        router.get('/listht/:htID', (req, res) => {
            console.log('list by htID')

            this.historicalTransactionService.listEstateByHTID(req.params.htID)
                .then((listDetails) => res.json(listDetails))
                .catch((err) => res.status(500).json(err));
        })

        return router;
    }
}

module.exports = HistoricalTransactionRouter