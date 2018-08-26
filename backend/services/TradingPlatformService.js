class TradingPlatformService {
    constructor(knex) {
        this.knex = knex;
    }
    // need to figure out how to get the re_id (check to see if this property exists and or get re_id into trade post....)
    addPropertyTradePost(address, catfathername, catname, asking_price, area, special_note, image_url, userID) {
        let query = this.knex
            .select('re_id')
            .from('real_estate')
            .where('real_estate.addr', address)
            .andWhere('catfathername', catfathername)
            .andWhere('catname', catname)
            console.log('selecting')
                console.log(query)

        return query.then((rows) => {
            if (rows.length !== 1) {
                console.log('property exists')
                return this.knex
                    .insert({
                        re_id: query[0].re_id, //migght be wrong
                        asking_price: asking_price,
                        special_note: special_note,
                        images: image_url,
                        user_id: userID,
                    }).into('trade_post')
                    .then(console.log('new property kinda '))


            } else {
                return this.knex
                    .insert({
                        addr: address,
                        catfathername: catfathername,
                        catname: catname,
                        area: area,
                    }).into('real_estate')
                    .then().insert({
                        re_id: query[0].re_id, //migght be wrong
                        asking_price: asking_price,
                        special_note: special_note,
                        images: image_url,
                        user_id: userID,
                    }).into('trade_post')
                    .then(console.log('new property '))
                    



            }
        })
    }



    listPropertiesTradePost(userID) { //get trade posts by user
        let query = this.knex.select
            .select(
                'trade_post.re_id',
                'trade_post.asking_price',
                'trade_post.special_note',
                'trade_post.image_url'
            )
            .from('trade_post')
            .innerJoin('users', 'trade_post.user_id', 'users.user_id')
            .innerJoin('real_estate', 'trade_post.re_id', 'real_estate.re_id')
            .where('users.user_id', userID)

        return query.then((rows) => {
            return rows.map(row => ({
                re_id: row.re_id,
                asking_price: row.asking_price,
                special_note: row.special_note,
                images: image_url,
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

    editPropertyTradePost(address, catfathername, catname, asking_price, area, special_note, image_url, userID, postID) {
    let query = this.knex
    .select(
        'trade_post.re_id',
        'trade_post.user_id',
    )
    .from('trade_post')
    .where('trade_post.tp_id', postID)


    
return query.then((rows) => {
    if (rows.length !== 1) {
        console.log('property exists user')
        return this.knex
            .insert({
                re_id: query[0].re_id, //migght be wrong
                asking_price: asking_price,
                special_note: special_note,
                images: image_url,
                user_id: userID,
            }).into('trade_post')
    } else {
        return this.knex
            .insert({
                addr: address,
                catfathername: catfathername,
                catname: catname,
                area: area,
            }).into('real_estate')
            .then().insert({
                re_id: query[0].re_id, //migght be wrong
                asking_price: asking_price,
                special_note: special_note,
                images: image_url,
                user_id: userID,
            }).into('trade_post')

    }
})
}

}

module.exports = TradingPlatformService;