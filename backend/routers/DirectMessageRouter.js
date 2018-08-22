const express = require('express');

class DirectMessageRouter {
    constructor(directMessageService) {
        this.directMessageService = directMessageService;
    }

    router() {
        let router = express.Router();


        return router;
    }
}

module.exports = DirectMessageRouter