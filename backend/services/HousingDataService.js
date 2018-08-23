class HousingDataService {
    constructor(knex) {
        this.knex = knex;
    }


    insertHistoricalTransactionData () {
        let query= this.knex
            .select()
            
    }
}