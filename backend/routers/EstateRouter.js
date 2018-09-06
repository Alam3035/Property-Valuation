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

            this.estateService.listEstatesByIsland(req.params.rootID, req.query.page, req.query.numberOfResults)
                .then((islandDetail) => res.json(islandDetail))
                .catch((err) => res.status(500).json(err));
        })

        //get Estate by District
        router.get('/district/:catfathername', (req, res) => {
            console.log('list by catfathername')

            this.estateService.listEstateByDistrict(req.params.catfathername, req.query.page, req.query.numberOfResults)
                .then((districtDetail) => res.json(districtDetail))
                .catch((err) => res.status(500).json(err));
        })

        //get Estate by Estate
        router.get('/estate/:catname', (req, res) => {
            console.log('list by catname')

            this.estateService.listEstateByEstate(req.params.catname, req.query.page, req.query.numberOfResults)
                .then((estateDetail) => res.json(estateDetail))
                .catch((err) => res.status(500).json(err));
        })

        //get Estate by Addr  encodeURI() in  the front end we need to encode the 'addr'
        router.get('/address/:addr', (req, res) => {
            console.log('list by addr')

            this.estateService.listEstateByAddr(req.params.addr)
                .then((addrDetail) => res.json(addrDetail))
                .catch((err) => res.status(500).json(err));
        })

        //get Estate his_trans average price
        router.get('/infoP/:catname', (req, res) => {
            console.log('infoP by catname')

            this.estateService.getInfoOnEstate(req.params.catname)
                .then((estateInfo) => res.json(estateInfo))
                .catch((err) => res.status(500).json(err));
        })

         //get Estate his_trans average price
         router.get('/infoA', (req, res) => {
             console.log('list Properties in Initial District')
 
             this.estateService.listEstateByInitialDistrict('Wan Chai', req.query.page, req.query.numberOfResults)
                 .then((districtDetail) => res.json(districtDetail))
                 .catch((err) => res.status(500).json(err));
         })

         router.get('/infoA/:catfathername', (req, res) => {
             console.log('infoA by catfathername')
 
             this.estateService.getAverageOfCatFatherName(req.params.catfathername)
                 .then((estateInfo) => res.json(estateInfo))
                 .catch((err) => res.status(500).json(err));
         })
 
         //get Estate by District
         router.get('/infoA/:catfathername', (req, res) => {
             console.log('list by catfathername')
 
             this.estateService.listEstateByDistrict(req.params.catfathername || 'Wan Chai')
                 .then((districtDetail) => res.json(districtDetail))
                 .catch((err) => res.status(500).json(err));
         })

            return router;

    }
}

module.exports = EstateRouter;