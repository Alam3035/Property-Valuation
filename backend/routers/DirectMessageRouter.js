const express = require('express');

class DirectMessageRouter {
    constructor(directMessageService) {
        this.directMessageService = directMessageService;
    }

    router() {
        let router = express.Router();

        router.get('/messages',this.get.bind(this));
        router.post('/messages',this.get.bind(this));
        return router;
    }

    get(req, res) {
        console.log('Is this getting?')
        return this.messageService
            .listConversation(req.query.sender_id,req.query.receiver_id)
            .then((messages) => res.json(messages))
            .catch(err => res.status(500).json(err));
    }

    post(req, res) {
        console.log('Is this posting?')
        return this.messageService
            .send(rew.body)
            .then(() => {
                this.messageService
                .listConversation(req.body.sender_id, req.body.receiver_id);
            })
            .then((messages) => res.json(messages))
            .catch(err => res.status(500).json(err));
    }
        return router;
    }
}

module.exports = DirectMessageRouter