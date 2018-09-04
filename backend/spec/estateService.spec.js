const EstateService = require('../services/EstateService')


describe('EstateService', function () {
    it('list Estate', function () {
        const estateService = new EstateService()
        let data = estateService.getInfoOnEstate()
        expect(data).toEqual([])
    })

    it('getAVofEstateCatfathername', function () {
        const estateService = new EstateService()
        let data = estateService.getAverageOfCatFatherName()
        expect(data).toEqual([])
    })
})

// need tests for differnt types of estate 