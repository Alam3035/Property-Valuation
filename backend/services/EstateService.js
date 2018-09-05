class EstateService {
    constructor(knex) {
        this.knex = knex;
    }

    // List Initial District

    async listEstateByInitialDistrict(district) {
        
        return await this.knex
            .select(
                'real_estate.re_id',
                'real_estate.addr',
                'real_estate.catname'
            )
            .from('real_estate')
            .where('real_estate.catfathername', district)
            .limit(100)

    }


    //Get the transaction history of an estate
    getInfoOnEstate(catname) {
        let query = this.knex
            .select(
                'real_estate.re_id',
                'real_estate.catfathername'
            )
            .from('real_estate')
            .where('real_estate.catname', 'like', `%${catname}%`)
            .limit(300)

        return query.then(rows => {
            return rows.map(row => ({
                re_id: row.re_id,
                catfathername: row.catfathername,
                averages: []
            }));
        })
            .then(rows => {
                return Promise.all(
                    rows.map(row => {
                        let query = this.knex
                            .select(
                                'historical_transaction.price_value',
                                'historical_transaction.winloss'
                            )
                            .from('historical_transaction')
                            .innerJoin('real_estate', 'historical_transaction.re_id', 'real_estate.re_id')
                            .where('historical_transaction.re_id', row.re_id)
                        return query.then(reRows => {
                            console.log(reRows)
                            if (reRows.length === 0) {
                                reRows.push({
                                    price_value: 1000000,
                                    winloss: 10
                                })
                                console.log(reRows)
                            }
                            const averageHT = reRows.reduce(function (acc, reRow) {
                                return acc + Number(reRow.price_value)
                            }, 0) / reRows.length
                            // const averageHT = reRows.reduce(function (acc, reRow) { return acc + isNaN(Number(reRow.price_value)) }, 0)/reRows.length
                            const averageWL = reRows.reduce(function (acc, reRow) { return acc + Number(reRow.winloss) }, 0) / reRows.length
                            row.averages = ({
                                averageHT: averageHT,
                                averagewinloss: averageWL
                            });
                            return row;
                        })

                    })
                )
            })
            .then(rows => {
                const actualAverageHT = rows.reduce(function (acc, row) { return acc + Number(row.averages.averageHT) }, 0) / rows.length
                const actualAverageWL = rows.reduce(function (acc, row) { return acc + Number(row.averages.averagewinloss) }, 0) / rows.length
                const roundedAverageHT = actualAverageHT.toFixed(0)
                const roundedAverageWL = actualAverageWL.toFixed(0)

                return { roundedAverageHT, roundedAverageWL }
            })
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
            .where('historical_transaction.rootid', rootID)

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
                                'historical_transaction.sq_price',
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
                                    sq_price: reRow.sq_price,
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
    listEstateByDistrict(catfathername) { // add average winloss and price_value to estate not address.
        let query = this.knex
            .select(
                'real_estate.catname',
                'real_estate.re_id'
            )
            .from('real_estate')
            .where('real_estate.catfathername', 'like', `%${catfathername}%`)
            .limit(100)
        console.log('selecting')

        return query.then(rows => {
            return rows.map(row => ({
                catname: row.catname,
                re_id: row.re_id,
                average: []
            }));
        })
            .then(rows => {
                return Promise.all(
                    rows.map(row => {
                        let query = this.knex
                            .select(
                                'historical_transaction.price_value',
                                'historical_transaction.winloss'
                            )
                            .from('historical_transaction')
                            .innerJoin('real_estate', 'historical_transaction.re_id', 'real_estate.re_id')
                            .where('historical_transaction.re_id', row.re_id)

                        return query.then(reRows => {

                        
                            if (reRows.length === 0) {
                                reRows.push({
                                    price_value: 1000000,
                                    winloss: 10
                                })
                            }

                            const averageHT = reRows.reduce(function (acc, reRow) {
                                console.log('the hunter is huntering')
                                return acc + Number(reRow.price_value)
                            }, 0) / reRows.length

                            // const averageHT = reRows.reduce(function (acc, reRow) { return acc + isNaN(Number(reRow.price_value)) }, 0)/reRows.length

                            const averageWL = reRows.reduce(function (acc, reRow) { return acc + Number(reRow.winloss) }, 0) / reRows.length

                            row.average = ({
                                averageHT: averageHT,
                                averagewinloss: averageWL
                            });
                            return row;
                        })

                    })
                )
            })

    }
    // need to test but should produce both values wanted. 
    getAverageOfCatFatherName(catfathername) {
            let query = this.knex
    
            // .avg('sq_price')
            .avg('price_value')
            .sum('winloss')
            .count('winloss')
            
            .column('catname')
            .from('historical_transaction')
            .innerJoin('real_estate', 'historical_transaction.re_id', 'real_estate.re_id')
            .where('real_estate.catfathername', 'like', `%${catfathername}%`)
            .limit(150)
            .groupBy('real_estate.catname')
            
//orderBy
        return query.then(rows => {
  
            return rows.map(row => ({
            
                catname: row.catname,
                avPrice_value: (Number(row.avg)).toFixed(0),
               // avPrice_sq: (Number(row.avg)).toFixed(0),
                avWinloss:  (Number((row.sum)/row.count)).toFixed(0)
                
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
            .where('real_estate.catname', 'like', `%${catname}%`)
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
                                'historical_transaction.sq_price',
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
                                    sq_price: reRow.sq_price,
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
            .where('real_estate.addr', 'like', `%${addr}%`)// 'like',  `%${addr}%`)
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
                                'historical_transaction.sp_price',
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
                                    sq_price: reRow.sq_price,
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