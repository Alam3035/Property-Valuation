class TradingPlatformService {
    constructor(knex) {
        this.knex = knex;
    }

    addPropertyTradePost(address, catfathername, catname, asking_price, area, special_note, image_url, userID) {
        console.log(address, catfathername, catname, asking_price, area, special_note, image_url, userID)

        let query = this.knex
            .select('re_id')
            .from('real_estate')
            .where('addr', address)
            .where('catfathername', catfathername)
            .andWhere('catname', catname)
        return query.then((rows) => {
            if (rows.length == 1) {
                return this.knex
                    .insert({
                        re_id: rows[0].re_id,
                        asking_price: asking_price,
                        special_note: special_note,
                        images: image_url,
                        user_id: userID,
                    }).into('trade_post').then(console.log('address exists'))

            } else {
                return this.knex
                    .insert({
                        addr: address,
                        catfathername: catfathername,
                        catname: catname,
                        area: area,
                    }).into('real_estate').then(function (data) {
                        console.log(data)
                        return this.knex
                            .insert({
                                re_id: re_id,
                                asking_price: asking_price,
                                special_note: special_note,
                                images: image_url,
                                user_id: userID
                            }).into('trade_post')
                    })
            }
        })
    }

    listPropertiesTradePostUser(userID) { //get trade posts by user
        let query = this.knex
            .select(
                'trade_post.re_id',
                'trade_post.asking_price',
                'trade_post.special_note',
                'trade_post.images'
            )
            .from('trade_post')
            .innerJoin('users', 'trade_post.user_id', 'users.user_id')
            .where('users.user_id', userID)

        return query.then((rows) => {
            return rows.map(row => ({
                re_id: row.re_id,
                asking_price: row.asking_price,
                special_note: row.special_note,
                images: row.images,
                address: []
            }))
        })
            .then(rows => { //get the real_estate for each trade post.
                return Promise.all(
                    rows.map(row => {
                        let query = this.knex
                            .select(
                                'real_estate.catname',
                                'real_estate.catfathername',
                                'real_estate.addr',
                                'real_estate.area'
                            )
                            .from('real_estate')
                            .where('real_estate.re_id', row.re_id)

                        return query.then(reRows => {
                            reRows.forEach(reRow => {
                                row.address.push({
                                    catname: reRow.catname,
                                    catfathername: reRow.catfathername,
                                    addr: reRow.addr,
                                    area: reRow.area
                                });
                            });
                            return row;
                        })
                    })
                )
            })
    }

    listPropertiesTradePostPost(postID) {
        let query = this.knex
        .select(
            'trade_post.re_id',
            'trade_post.asking_price',
            'trade_post.special_note',
            'trade_post.images'
        )
        .from('trade_post')
        .where('trade_post.tp_id', postID)

    return query.then((rows) => {
        return rows.map(row => ({
            re_id: row.re_id,
            asking_price: row.asking_price,
            special_note: row.special_note,
            images: row.images,
            address: []
        }))
    })
        .then(rows => { //get the real_estate for each trade post.
            return Promise.all(
                rows.map(row => {
                    let query = this.knex
                        .select(
                            'real_estate.catname',
                            'real_estate.catfathername',
                            'real_estate.addr',
                            'real_estate.area'
                        )
                        .from('real_estate')
                        .where('real_estate.re_id', row.re_id)

                    return query.then(reRows => {
                        reRows.forEach(reRow => {
                            row.address.push({
                                catname: reRow.catname,
                                catfathername: reRow.catfathername,
                                addr: reRow.addr,
                                area: reRow.area
                            });
                        });
                        return row;
                    })
                })
            )
        })
    }


    editPropertyTradePost(asking_price, special_note, image_url, postID) {
        let query = this.knex
            .select(
                'trade_post.re_id',
                'trade_post.user_id',
        )
            .from('trade_post')
            .where('trade_post.tp_id', postID)

        return query.then((rows) => {
                    return this.knex('trade_post')
                        .where('trade_post.tp_id', postID)
                        .update({
                            re_id: rows[0].re_id,
                            user_id: rows[0].user_id,
                            asking_price: asking_price,
                            special_note: special_note,
                            images: image_url
                        })
                })
        }

        listAllTradePosts(){
            let query = this.knex
            .select(
                
            )
        }
}

module.exports = TradingPlatformService;