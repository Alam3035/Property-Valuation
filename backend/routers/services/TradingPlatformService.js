class TradingPlatformService {
    constructor(knex){
        this.knex = knex;
    }

    addPropertyTradePost(streetAddress,estate,price,area,posterComment,images,userID) {
        let query = this.knex   
            .select()
            .from('users')
            .where('users.user_id', userID)

            return query.then((rows) => {
                if(rows.length !==1) {
                    throw new Error('Invalid User');
                } else {
                    return this.knex
                        .insert({
                            address: streetAddress,
                            catname: estate,
                            asking_price: price,
                            area: area,
                            special_note: posterComment,
                            images: images,
                            user_id: userID
                        }).into('trade_post')
                }
            })
    }

    editPropertyTradePost(streetAddress,estate,price,area,posterComment,images,tpID, userID) {
        let query = this.knex
            .select()
            .from('users')
            .where('users.user_id', userID)

            return query.then((rows)=> {
                if(rows.length === 1) {
                    return this.knex('trade_post')
                        .where('tp_id', tpID).update({
                            address: streetAddress,
                            catname: estate,
                            asking_price: price,
                            area: area,
                            special_note: posterComment,
                            images: images,
                        });
                } else {
                    throw new Error('No such trading post')
                }
            });
    }

    listPropertiesTradePost(userID) {
        let query = this.knex 
        .select(
            'trade_post.address',
            'trade_post.catname',
            'trade_post.asking_price',
            'trade_post.area',
            'trade_post.special_note',
            'trade_post.images',
            'trade_post.tp_id'    
        )
        .from('trade_post')
        .where('trade_post.user_id', userID)

        return query.then(rows => {
            return rows.map(row => ({
                address: row.address,
                catname: row.catname,
                asking_price: row.asking_price,
                area: row.area,
                special_note: row.special_note,
                images: row.images
            }));
        })
    }

    removePropertyTradePost(postID, userID) {
        let query = this.knex  
            .select('tp_id')
            .from('trade_post')
            .where('trade_post.user_id', userID);

            return query.then((rows) => {
                if(rows.length === 1) {
                    return this.knex('trade_post')
                        .where('tp_id', postID)
                        .del();
                } else {
                    throw new Error ('No such user or trade post')
                }
            });
    }
}

module.exports = TradingPlatformService;