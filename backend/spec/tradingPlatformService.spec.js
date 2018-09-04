const TradingPlatformService = require('../services/TradingPlatformService')

describe('TradingPlatformService', function () {
    it('list all tradeposts', function () {
        const tradingPlatformService = new TradingPlatformService()
        let data = tradingPlatformService.listAllTradePosts()
        expect(data).toEqual([])
    })

    // will need tests for
    // add tradepost
    //edit tradepost
     //(maybe also for list by user_id or tp_id)
})

