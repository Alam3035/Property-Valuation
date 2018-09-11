const express = require('express');

class TradingPlatformRouter {
    constructor(tradingPlatformService) {
        this.tradingPlatformService = tradingPlatformService;
    }

    router() {
        let router = express.Router();

        //Trade post service

        //add property 
        router.post('/add/:userID', (req, res) => {
            console.log('adding?')
            this.tradingPlatformService.addPropertyTradePost(req.body.address, req.body.catfathername, req.body.catname, req.body.asking_price, req.body.area, req.body.special_note, req.body.image_url, req.user.id) //req.user.user_id
        //req.session.passport.user.id add in?
                .then(() => this.tradingPlatformService.listPropertiesTradePostUser(req.user.id))
                .then(console.log('second one'))
                .then((trade_post) => res.json(trade_post))
                .catch((err) => res.status(500).json(err));
        })

        //edit property
        router.put('/edit/:postID', (req, res) => {
            console.log('editing?')

            this.tradingPlatformService.editPropertyTradePost(req.body.asking_price, req.body.special_note, req.body.image_url, req.params.postID) 
            //req.session.passport.user.id second section doesnt work
                .then(() => this.tradingPlatformService.listPropertiesTradePostPost(req.params.postID))
                .then((propertyDetails) => res.json(propertyDetails))
                .catch((err) => res.status(500).json(err));
        })

        router.get('/listPost/:postID', (req, res) => {
            console.log('listing post?')

            this.tradingPlatformService.listPropertiesTradePostPost(req.params.postID)
                .then((trade_post) => res.json(trade_post))
                .catch((err) => res.status(500).json(err));
        });

        router.get('/listUser/:userID', (req, res) => {
            console.log('listing user?')

            this.tradingPlatformService.listPropertiesTradePostUser(req.user.id) //req.user.user_id
                .then((trade_post) => res.json(trade_post))
                .catch((err) => res.status(500).json(err));
        });

        //most important route here.
        router.get('/list/list', (req, res) => {
            console.log('listing list')
            this.tradingPlatformService.listAllTradePosts(req)
            .then((trade_post) => res.json(trade_post))
                .catch((err) => res.status(500).json(err));

        })

        return router;

    }
}

module.exports = TradingPlatformRouter