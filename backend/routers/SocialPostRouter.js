const express = require('express');

class SocialPostRouter {
    constructor(socialPostService) {
        this.socialPostService = socialPostService;
    }

    router() {
        let router = express.Router();
        //Social Post 

        //Adding a new Blog Post
        router.post('/:userID', (req, res) => {
            console.log('You see this?')

            this .socialPostService.addSocialPost(req.body.header, req.body.body, req.body.header_image,req.params.userID)
            .then(() => this.socialPostService.listSocialPost(req.params.userID))
            .then((social_post) => res.json(social_post))
            .catch((err) => rest.status(500).json(err));
        })

        //list all the blogs by special user
        router.get('/:userID', (req,res) => {
            console.log('You see this?')

            this.socialPostService.listSocialPost(req.params.userID)
            .then((social_post) => res.json(social_post))
            .catch((err) => res.status(500).json(err));
        });

        //edit social post
        router.put('/:spostID', (req,res) => {
            console.log('You see this?')

            this.socialPostService.editSocialPost(req.body.header, req.body.body, req.body.header_image)
            .then((socialPostDetails) => res.json(socialPostDetails))
            .catch((err) => res.status(500).json(err));
        })

        //delete social post
        router.delete('/:spostID', (req, res) => {
            console.log('You see this?')

            this.socialPostService.deleteSocialPost(req.params.userID)
            .then(() => this.socialPostService.listSocialPost(req.params.userID))
            .then((social_post) => res.json(social_post))
            .catch((err) => res.status(500).json(err));
        })

        return router;
    }
}

module.exports = SocialPostRouter;