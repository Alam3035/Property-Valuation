const express = require("express");

class UserFavRouter {
  constructor(userFavService) {
    this.userFavService = userFavService;
  }

  router() {
    let router = express.Router();

    // Favourite Social Post
    router.get("/checkpost/:postID", (req, res) => {
      // check status of social post
      this.userFavService
        .isFavSocialPost(req.params.postID)
        .then(status => res.json(status))
        .catch(err => res.status(500).json(err));
    });

    router.post("/addpost/:postID", (req, res) => {
      // add social post to favoutire
      this.userFavService
        .addFavSocialPost(req.params.postID)
        .then(() => this.userFavService.isFavSocialPost(req.params.postID))
        .then(status => res.json(status))
        .catch(err => res.status(500).json(err));
    });

    router.delete("/deletepost/:postID", (req, res) => {
      // delete social post from favoutires
      this.userFavService
        .deleteFavSocialPost(req.params.postID)
        .then(() => this.userFavService.isFavSocialPost(req.params.postID))
        .then(status => res.json(status))
        .catch(err => res.status(500).json(err));
    });

    router.get("/listfavsp/:postID", (req, res) => {
      // list favoutire social post
      this.userFavService
        .listFavSocialPost()
        .then(social_post => res.json(social_post))
        .catch(err => res.status(500).json(err));
    });

    // Favourite Flats
    router.get("/listfavflat/:reID", (req, res) => {
      // check status of flat
      this.userFavService
        .isFavFlat(req.params.reID)
        .then(status => res.json(status))
        .catch(err => res.status(500).json(err));
    });

    router.post("/addflat/:reID", (req, res) => {
      // add flat to favoutire
      console.log("Add Flat");
      this.userFavService
        .addFavFlat(req.params.reID, req.user.id)
        .then(() =>
          this.userFavService.isFavFlat(req.params.reID, req.user.id)
        )
        .then(status => res.json(status))
        .catch(err => res.status(500).json(err));
    });

    router.delete("/deleflat/:reID", (req, res) => {
      // delete flat from favoutires small edit
      console.log("Delete Flat");
      this.userFavService
        .deleteFavFlat(req.params.reID, req.user.id)
        .then(() =>
          this.userFavService.listFlatFavs(req.params.reID, req.user.id)
        )
        .then(status => res.json(status))
        .catch(err => res.status(500).json(err));
    });

    // router.get("/watchlist/:userID", (req, res) => {
    //   // list favoutire flat
    //   console.log("List Flat");
    //   this.userFavService
    //     .listFavFlat(req.user.id)
    //     .then(real_estate => res.json(real_estate))
    //     .catch(err => res.status(500).json(err));
    // });
        router.get('/watchlist', (req, res) => { // list favoutire flat
            this.userFavService.listFlatFavs(req.user.id)
                .then((real_estate) => res.json(real_estate))
                .catch((err) => res.status(500).json(err));
        })
        return router;
    }

}

module.exports = UserFavRouter;
