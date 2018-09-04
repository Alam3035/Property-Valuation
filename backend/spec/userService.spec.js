const UserService = require('../services/UserService')

describe('UserService', function () {
    it('edits username and phone', function () {
        const userService = new UserService()
        let data = userService.updateUserDetail()
        expect(data).toEqual([]) //probably change the last line 
    })

    it('lists user details', function () {
        const userService = new UserService()
        let data = userService.getUserDetail()
        expect(data).toEqual([])
    })
})