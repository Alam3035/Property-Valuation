class HistoricalTransactionService {
    constructor(knex) {
        this.knex = knex;
    }

    //List all historical transactions per estate (re_id)
    listHistoricalTransactionByRealEstate(reID) {
        let query = this.knex
            .select(
                'real_estate.addr',
                'real_estate.catfathername',
                'real_estate.catname',
                'real_estate.re_id'
            )
            .from('real_estate')
            .where('real_estate.re_id', reID)
        console.log('selecting')

        return query.then(rows => {
            return rows.map(row => ({
                re_id: row.re_id,
                addr: row.addr,
                catfathername: row.catfathername,
                catname: row.catname,
                transactions: []
            }));
        })
            .then(rows => { //Get Address for the historical transactions with same re_id
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
                            .limit(100)
                            //could also list by date
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

    listEstateByHTID(htID) {
        let query = this.knex
            .select(
                'historical_transaction.price_value',
                'historical_transaction.date',
                'historical_transaction.winloss',
                'historical_transaction.img_url',
                'historical_transaction.id',
                'historical_transaction.ht_id',
                'historical_transaction.re_id'
            )
            .from('historical_transaction')
            .where('historical_transaction.ht_id', htID)

            return query.then(rows => {
                return rows.map(row => ({
                    price_value: row.price_value,
                    date: row.date,
                    winloss: row.winloss,
                    img_url: row.img_url,
                    id: row.id,
                    ht_id: row.ht_id,
                    re_id: row.re_id,
                    real_estate: []
                }));
            })
            .then(rows=> {
                return Promise.all(
                    rows.map(row => {
                        let query = this.knex
                        .select(
                            'real_estate.re_id',
                            'real_estate.catfathername',
                            'real_estate.catname',
                            'real_estate.area'
                        )
                        .from('real_estate')
                        .innerJoin('historical_transaction', 'real_estate.re_id', 'historical_transaction.re_id')
                        .where('historical_transaction.ht_id', htID)

                        return query.then(reRows => {
                            reRows.forEach(reRow => {
                                row.real_estate.push({
                                    re_id: reRow.re_id,
                                    catfathername: reRow.catfathername,
                                    catname: reRow.catname,
                                    area: reRow.area
                                });
                            });
                            return row;
                        })
                    })
                )
            })
    }


}

module.exports = HistoricalTransactionService;


