class HistoricalTransactionService {
    constructor(knex) {
        this.knex = knex;
    }

    // Historical Transaction Services
    listHistoricalTransactionsByDistrict(rootID) { //list out data from home page this data is sorted by Island
        let query = this.knex   
            .select(
                'historical_transaction.ht_id',
                'historical_transaction.addr',
                'historical_transaction.catfathername',
                'historical_transaction.catname',
                'historical_transaction.date',
                'historical_transaction.winloss',
                'historical_transaction.price_value',
                'historical_transaction.sq_price_value',
                'historical_transaction.area',
                'historical_transaction.img'
            )
            .from('historical_transaction')
            .where('historical_transaction.rootid', rootID)
            .orderBy('historical_transaction.winloss', 'desc')

            return query.then((rows) => {
                return rows.map(row => ({
                    ht_id: row.ht_id,
                    addr: row.addr,
                    catfathername: row.catfathername,
                    catname: row.catname,
                    date: row.date,
                    winloss: row.winloss,
                    price_value: row.price_value,
                    sq_price_value: row.sq_price_value,
                    area: row.area,
                    img: row.img
                }))
            })

    }

    listHistoricalTransactionAverageEstatePrices(catname) { // list out  the average price of each estate?
        let query = this.knex
            .select(
                'historical_transaction.block',
                'historical_transaction.price_value',
                'historical_transaction.winloss'
            )
            .from('historical_transaction')
            .where('historical_transaction.catname', catname)


// here we should write the code that will create an average of all transactions with the same catname (estate)

            return query.then(rows => {
                return rows.map(row => ({
                    block: row.block,
                    price_value: row.price_value,
                    winloss: row.winloss
                }));
            })

    }

    getHistoricalTransactionDetail(htID){ // lists details of a historical transaction
        let query = this.knex
            .select(
                'historical_transaction.addr',
                'historical_transaction.catfathername',
                'historical_transaction.catname',
                'historical_transaction.date',
                'historical_transaction.winloss',
                'historical_transaction.price_value',
                'historical_transaction.sq_price_value',
                'historical_transaction.area'
            )
            .from('historical_transaction')
            .where('historical_transaction.ht_id', htID)

            return query.then(rows => {
                return rows.map(row => ({
                    addr: row.addr,
                    catfathername: row.catfathername,
                    catname: row.catname,
                    date: row.date,
                    winloss: row.winloss,
                    price_value: row.price_value,
                    sq_price_value: row.sq_price_value,
                    area: row.area,
                }));
            })
    }

}

module.exports = HistoricalTransactionService;