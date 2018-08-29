class EstateService {
    constructor(knex) {
        this.knex = knex;
    }

    //EstateServices // refactor the real_estate data first. then retrieve the historical trans
    listEstatesByIsland(rootID) { //breaks due to size?
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
            .limit(100)

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
                            'historical_transaction.price_value',
                            'historical_transaction.date',
                            'historical_transaction.winloss',
                            'historical_transaction.id',
                            'historical_transaction.img_url',
                            'historical_transaction.ht_id',
                        )
                        .from('historical_transaction')
                        .where('historical_transaction.re_id', row.re_id)
                        .orderBy('historical_transaction.winloss', 'asc')

                        return query.then(reRows => {
                            reRows.forEach(reRow => {
                                row.transactions.push({
                                    rootid: reRow.rootid,
                                    price_value: reRow.price_value,
                                    date: reRow.date,
                                    winloss: reRow.winloss,
                                    id: reRow.id,
                                    img_url: reRow.img_url,
                                    ht_id: reRow.ht_id,
                                });
                            });
                            return row;
                        })
                    })
                )
            })
    }

    //List by district
    listEstateByDistrict(catfathername) {
        let query = this.knex
            .select(
                'real_estate.re_id',
                'real_estate.addr',
                'real_estate.catname'
            )
            .from('real_estate')
            .where('real_estate.catfathername', catfathername)
            .limit(100)
            console.log('selecting')

            return query.then(rows => {
                return rows.map(row => ({
                    re_id: row.re_id,
                    addr: row.addr,
                    catname: row.catname,
                }));
            })

    }

    //list by Estate
    listEstateByEstate(catname) {
        let query = this.knex
            .select(
                'real_estate.re_id',
                'real_estate.addr',
                'real_estate.catfathername'
            )
            .from('real_estate')
            .where('real_estate.catname', catname)
            .limit(100)
            console.log('selecting')

            return query.then(rows => {
                return rows.map(row => ({
                    re_id: row.re_id,
                    addr: row.addr,
                    catfathername: row.catfathername,
                    transactions: []
                }));
            })
            .then(rows => {
                return Promise.all(
                    rows.map(row => {
                        let query = this.knex
                            .select('historical_transaction.price_value',
                                'historical_transaction.date',
                                'historical_transaction.winloss',
                                'historical_transaction.img_url',
                                'historical_transaction.id',
                                'historical_transaction.ht_id',
                                'historical_transaction.re_id')
                            .from('historical_transaction')
                            .innerJoin('real_estate', 'historical_transaction.re_id', 'real_estate.re_id')
                            .where('real_estate.re_id', row.re_id)
                            .orderBy('historical_transaction.winloss', 'desc')
                        console.log('selecting two')

                        return query.then(reRows => {
                            reRows.forEach(reRow => {
                                row.transactions.push({
                                    re_id: reRow.re_id,
                                    price_value: reRow.price_value,
                                    date: reRow.date,
                                    winloss: reRow.winloss,
                                    img_url: reRow.img_url,
                                    id: reRow.id,
                                    ht_id: reRow.ht_id
                                });
                            });
                            return row;
                        })
                    })
                )
            })
    }
        
    //will work in post man if the address is encodeURI() -- we will need to give users address options
    listEstateByAddr(addr) { //list by addr wont work due to / in addr?
        let query = this.knex
        .select(
            'real_estate.re_id',
            'real_estate.catname',
            'real_estate.catfathername'
        )
        .from('real_estate')
        .where('real_estate.addr', addr)// 'like',  `%${addr}%`)
        console.log('selecting')
        console.log(addr)

        return query.then(rows => {
            return rows.map(row => ({
                re_id: row.re_id,
                catname: row.catname,
                catfathername: row.catfathername,
                transactions: []
            }));
        })
        .then(rows => {
            console.log(rows);
            return Promise.all(
                rows.map(row => {
                    let query = this.knex
                        .select('historical_transaction.price_value',
                            'historical_transaction.date',
                            'historical_transaction.winloss',
                            'historical_transaction.img_url',
                            'historical_transaction.id',
                            'historical_transaction.ht_id',
                            'historical_transaction.re_id')
                        .from('historical_transaction')
                        .innerJoin('real_estate', 'historical_transaction.re_id', 'real_estate.re_id')
                        .where('real_estate.re_id', row.re_id)
                        .orderBy('historical_transaction.winloss', 'desc')
                    console.log('selecting two')

                    return query.then(reRows => {
                        console.log(reRows)
                        reRows.forEach(reRow => {
                            row.transactions.push({
                                re_id: reRow.re_id,
                                price_value: reRow.price_value,
                                date: reRow.date,
                                winloss: reRow.winloss,
                                img_url: reRow.img_url,
                                id: reRow.id,
                                ht_id: reRow.ht_id
                            });
                        });
                        return row;
                    })
                })
            )
        })
    }

}

module.exports = EstateService;