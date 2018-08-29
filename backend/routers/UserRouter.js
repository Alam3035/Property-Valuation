const express = require('express');

class UserRouter {
    constructor(userService) {
        this.userService = userService;
    }

    router() {
        let router = express.Router();

        //add user service 
        router.post('/details/:userID', (req, res) => { //updating the users details
            this.userService.addUserDetails(req.params.userID,req.body.name,req.body.phone,req.body.email,req.body.special_user,req.body.password,req.body.google_id)
                .then((userDetails) => res.json(userDetails))
                .catch((err) => res.status(500).json(err));

        })

        // Profile details service
        router.get('/details/:userID', (req, res) => { //getting details of user profile
            this.userService.getUserDetail(req.params.userID)
            .then((userDetails) => res.json(userDetails))
            .catch((err) => re.status(500).json(err));
        })

        //edit user service
        router.put('/details/:userID', (req, res) => { //updating the users details
            this.userService.updateUserDetail(req.params.userID,req.body.name,req.body.phone,req.body.email)
                .then((userDetails) => res.json(userDetails))
                .catch((err) => res.status(500).json(err));

        })


        return router;
    }
}

module.exports = UserRouter