const TradingPlatformService = require('../services/TradingPlatformService')

describe('TradingPlatformService', function () {
    
    it('lists all tradeposts', function () {
        const tradingPlatformService = new TradingPlatformService()
        let data = tradingPlatformService.listAllTradePosts()
        expect(data).toEqual([])
    })

    it('adds tradepost to knex', function () {
        const tradingPlatformService = new TradingPlatformService()
        let data = tradingPlatformService.addPropertyTradePost()
        expect(data).toEqual([])// probably need to change this
    })

    it('lists a particular tradepost by postID', function () {
        const tradingPlatformService = new TradingPlatformService()
        let data = tradingPlatformService.listPropertiesTradePostPost()
        expect(data).toEqual([]) //change?
    })

    it('lists all tradeposts from a particular userID', function () {
        const tradingPlatformService = new TradingPlatformService()
        let data = tradingPlatformService.listPropertiesTradePostUser()
        expect(data).toEqual([])// change?
    })

})

