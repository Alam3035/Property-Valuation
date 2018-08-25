const express = require('express');

class EstateRouter {
    constructor(estateService) {
        this.estateService = estateService;
    }

    router() {
        let router = express.Router();

        //get Estate by Island giving an empty object
        router.get('/rootID/:rootID', (req, res) => {
            console.log('list by rootid')

            this.estateService.listEstatesByIsland(req.params.rootID)
                .then((islandDetail) => res.json(islandDetail))
                .catch((err) => res.status(500).json(err));
        })

        //get Estate by District
        router.get('/district/:catfathername', (req, res) => {
            console.log('list by catfathername')

            this.estateService.listEstateByDistrict(req.params.catfathername)
                .then((districtDetail) => res.json(districtDetail))
                .catch((err) => res.status(500).json(err));
        })

        //get Estate by Estate
        router.get('/estate/:catname', (req, res) => {
            console.log('list by catname')

            this.estateService.listEstateByEstate(req.params.catname)
                .then((estateDetail) => res.json(estateDetail))
                .catch((err) => res.status(500).json(err));
        })

        //get Estate by Addr
        router.get('/address/:addr', (req, res) => {
            console.log('list by addr')

            this.estateService.listEstateByAddr(req.params.addr)
                .then((addrDetail) => res.json(addrDetail))
                .catch((err) => res.status(500).json(err));
        })

            return router;

    }
}

module.exports = EstateRouter;