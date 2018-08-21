const express = require('express');

class SocialPostRouter {
    constructor(socialPostService) {
        this.socialPostService = socialPostService;
    }

    router() {
        let router = express.Router();


        return router;
    }
}

module.exports = SocialPostRouter