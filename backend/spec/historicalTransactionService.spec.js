const HistoricalTransactionService = require('../services/HistoricalTransactionService')

describe('HistoricalTransactionService', function () {

    it('lists all historical transactions by reID', function () {
        const historicalTransactionService = new HistoricalTransactionService()
        let data = historicalTransactionService.listHistoricalTransactionByRealEstate()
        expext(data).toEqual([])
    })

    it('lists historical transaction by htID, get a particular transaction with information', function () {
        const historicalTransactionService = new HistoricalTransactionService()
        let data = historicalTransactionService.listEstateByHTID()
        expext(data).toEqual([])
    })


})