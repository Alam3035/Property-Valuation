const express = require('express');

class TradingPlatformRouter {
    constructor(tradingPlatformService) {
        this.tradingPlatformService = tradingPlatformService;
    }

    router() {
        let router = express.Router();

        //Trade post service

        //add property -- may need to change the userID....?
        router.post('/add/:userID', (req, res) => {
            console.log('adding?')
            this.tradingPlatformService.addPropertyTradePost(req.body.address, req.body.catfathername, req.body.catname, req.body.asking_price, req.body.area, req.body.special_note, req.body.image_url, req.params.userID) //req.session.passport.user.id add in?
                .then(() => this.tradingPlatformService.listPropertiesTradePost(req.params.userID))
                .then((trade_post) => res.json(trade_post))
                .catch((err) => res.status(500).json(err));
        })

        //edit property
        router.put('/edit/:postID', (req, res) => {
            console.log('editing?')

            this.tradingPlatformService.editPropertyTradePost(req.body.address, req.body.catname, req.body.asking_price, req.body.area, req.body.special_note, req.body.images) //req.session.passport.user.id
                .then(() => this.tradingPlatformService.listPropertiesTradePost(req.params.userID))
                .then((propertyDetails) => res.json(propertyDetails))
                .catch((err) => res.status(500).json(err));
        })


        //delete property
        // router.delete('/remove/:postID', (req, res) => {
        //     console.log('deleting?')

        //     this.tradingPlatformService.removePropertyTradePost(req.params.postID)//req.session.passport.user.id
        //         .then(() => this.tradingPlatformService.listPropertiesTradePost(req.params.userID))
        //         .then((trade_post) => res.json(trade_post))
        //         .catch((err) => res.status(500).json(err));
        // })

        //list properties may neeed to change userID in favour of another query that will list all the information
        router.get('/list/:userID', (req, res) => {
            console.log('listing?')

            this.tradingPlatformService.listPropertiesTradePost(req.params.userID)
                .then((trade_post) => res.json(trade_post))
                .catch((err) => res.status(500).json(err));
        });

        return router;

    }
}

module.exports = TradingPlatformRouter