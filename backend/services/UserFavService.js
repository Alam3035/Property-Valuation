        class UserFavService {
        constructor(knex) {
            this.knex = knex;
        }


    // users favourite social posts
        isFavSocialPost(postID, userID) {
            let query = this.knex
            .select()
            .from('user_favourites_blogpost')
            .where('user_id',userID)
            .andWhere('post_id',postID)

            return query.then((rows) => {
                if (rows.length >= 1) {
                    return true;
                } else {
                    return false;
                }
            });
        };

        // make a Social Post favourite
        addFavSocialPost(postID, userID) {
            return this.knex('user_favourites_blogpost')
                .insert({"user_id":userID,"post_id":postID})
        };

        //delete favourite Social post
        delFavSocialPost(postID, userID) {
            return this.knex('user_favourites_blogpost')
            .where('user_id', userID)
            .andWhere('post_id', postID)
            .delete()
        };

        // list favourite social post
        listFavSocialPost(userID) {
            let query = this.knex
            .select()
            .from('user_favourite_blogpost')
            .where('user_favourite_blogpost.user_id', userID)
            
            return query.then(rows => {
                return rows.map(row => ({
                    post_id: row.post_id,
                    header: null,
                    body: null,
                    header_image: null
                }))
            })
            .then(rows => {
                return Promise.all(
                    rows.map(row => {
                        let query = this.knex
                        .select('post_id', 'header', 'body', 'header_image')
                        .from('social_post')
                        .orderBy('post_id')

                        return query.then(socialRows => {
                            socialRows.forEach(socialRows => {
                                row.header = socialRows.header;
                                row.body = socialRows.body;
                                row.header_image = socialRows.header_image;
                            })
                            return row;
                        })
                    })
                )
            })

        }


    // users favourite Flat
        isFavFlat(reID, userID) {
            let query =this.knex
            .select()
            .from('user_favourites_property')
            .where('user_id', userID)
            .andWhere('re_id', reID)

            return query.then((rows) => {
                if(rows.length >= 1) {
                    return true;
                } else {
                    return false;
                }
            });
        }

        addFavFlat(reID, userID) {
            console.log(userID, reID)
            return this.knex('user_favourites_property')
            .insert({"user_id":userID, "re_id":reID})
        };

        delFavFlat(reID, userID) {
            return this.knex('user_favourites_property')
            .where('user_id', userID)
            .andWhere('re_id', reID)
            .delete()
        };

        listFavFlat(rootID) { 
            let query = this.knex
                .select(
                    'real_estate.re_id',
                    'real_estate.addr',
                    'real_estate.catfathername',
                    'real_estate.catname'
                )
                .from('real_estate')
                .innerJoin('historical_transaction', 'real_estate.re_id', 'historical_transaction.re_id')
                .where('historical_transaction.rootid', rootID )
    
                return query.then(rows => {
                    return rows.map(row => ({
                        re_id: row.re_id,
                        addr: row.addr,
                        catfathername: row.catfathername,
                        catname: row.catname,
                        transactions: []
                    }));
                })
                .then(rows => {
                    return Promise.all(
                        rows.map(row => {
                            let query = this.knex
                            .select(
                                'historical_transaction.rootid',
                                'historical_transaction.id',
                                'historical_transaction.img_url',
                            )
                            .from('historical_transaction')
                            .where('historical_transaction.re_id', row.re_id)
    
                            return query.then(reRows => {
                                reRows.forEach(reRow => {
                                    row.transactions.push({
                                        rootid: reRow.rootid,
                                        id: reRow.id,
                                        img_url: reRow.img_url,
                                    });
                                });
                                return row;
                            })
                        })
                    )
                })
        }
    }

    module.exports = UserFavService;