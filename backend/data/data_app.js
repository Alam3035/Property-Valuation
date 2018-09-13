const axios = require('axios');
// const fs = require('fs');
// const stringify = require('csv-stringify');

require('dotenv').config(); //Define Enniroments
const NODE_ENV = process.env.NODE_ENV || 'development'
const knexFile = require('../knexfile')[NODE_ENV] // Connect to DB
const knex = require('knex')(knexFile)


const config = {
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
    }
}

// const file = fs.createWriteStream(__dirname + 'data.txt');

const getTransactionHistory = async function (i, num, callback) { //num for district
    // have the for loop for numbers here?
    console.log(i)
    try {
        let response = await axios.post('https://data.28hse.com/en/webservice', `draw=7&columns%5B0%5D%5Bdata%5D=date&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=false&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=catfathername&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=false&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=catname&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=false&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=price&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=false&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=winloss&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=false&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=area&columns%5B5%5D%5Bname%5D=&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=false&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B6%5D%5Bdata%5D=sq_price&columns%5B6%5D%5Bname%5D=&columns%5B6%5D%5Bsearchable%5D=true&columns%5B6%5D%5Borderable%5D=false&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B7%5D%5Bdata%5D=addr&columns%5B7%5D%5Bname%5D=&columns%5B7%5D%5Bsearchable%5D=true&columns%5B7%5D%5Borderable%5D=false&columns%5B7%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B7%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B8%5D%5Bdata%5D=contract&columns%5B8%5D%5Bname%5D=&columns%5B8%5D%5Bsearchable%5D=true&columns%5B8%5D%5Borderable%5D=false&columns%5B8%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B8%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B9%5D%5Bdata%5D=addr&columns%5B9%5D%5Bname%5D=&columns%5B9%5D%5Bsearchable%5D=true&columns%5B9%5D%5Borderable%5D=false&columns%5B9%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B9%5D%5Bsearch%5D%5Bregex%5D=false&start=${i * 10}&length=10&search%5Bvalue%5D=&search%5Bregex%5D=false&cmd=area_deals&area_id=${num}`, config); // implement a function to get ${num}all four areas ${num}
        
        //first item in object
            let query = await knex
                .select('real_estate.re_id')
                .from('real_estate')
                .where('real_estate.addr', response.data.data[0].addr)
                .andWhere('catfathername', response.data.data[0].catfathername)
                .andWhere('catname', response.data.data[0].catname)
            if (query.length >= 1) {
                let str = response.data.data[0].winloss
                let cleanStr = str.slice(0, str.length - 1)
                    console.log('information already there' + query[0].re_id)
                    let htQuery = await knex
                    
                    .select('historical_transaction.id', 'historical_transaction.rootid','historical_transaction.re_id')
                    .from('historical_transaction')
                    .innerJoin('real_estate', 'historical_transaction.re_id', 'real_estate.re_id')
                    .where('historical_transaction.id', response.data.data[0].id)
                    .andWhere('real_estate.addr', response.data.data[0].addr)
                    .andWhere('real_estate.catfathername', response.data.data[0].catfathername)
                    .andWhere('real_estate.catname', response.data.data[0].catname)
                    .andWhere('historical_transaction.rootid', response.data.data[0].rootid)

                    if (htQuery.length >= 1 ) {
                        console.log("I've been inserted already")
                    } else {

                    await knex
                .insert({
                        re_id: query[0].re_id,
                        id: response.data.data[0].id,
                        block: response.data.data[0].block,
                        rootid: response.data.data[0].rootid,
                        price_value: response.data.data[0].price_value,
                        date: response.data.data[0].date,
                        sq_price: response.data.data[0].sq_price_value,
                        winloss: cleanStr
                    }).into('historical_transaction').then(console.log('done one'))
                }
                
            } else {
                let str = response.data.data[0].winloss
                let cleanStr = str.slice(0, str.length - 1)
                await knex
                    .insert({
                        addr: response.data.data[0].addr,
                        catfathername: response.data.data[0].catfathername,
                        catname: response.data.data[0].catname,
                        area: response.data.data[0].area
                    }).into('real_estate').returning('re_id')

    
                let htQuery = await knex
                    
                    .select('historical_transaction.id', 'historical_transaction.rootid','historical_transaction.re_id')
                    .from('historical_transaction')
                    .innerJoin('real_estate', 'historical_transaction.re_id', 'real_estate.re_id')
                    .where('historical_transaction.id', response.data.data[0].id)
                    .andWhere('real_estate.addr', response.data.data[0].addr)
                    .andWhere('real_estate.catfathername', response.data.data[0].catfathername)
                    .andWhere('real_estate.catname', response.data.data[0].catname)
                    .andWhere('historical_transaction.rootid', response.data.data[0].rootid)

                    if (htQuery.length >= 1 ) {
                        console.log("I've been inserted already")
                    } else {

                        await knex
                         .insert({
                        re_id: htQuery[0].re_id,
                        id: response.data.data[0].id,
                        block: response.data.data[0].block,
                        rootid: response.data.data[0].rootid,
                        price_value: response.data.data[0].price_value,
                        date: response.data.data[0].date,
                        sq_price: response.data.data[0].sq_price_value,
                        winloss: cleanStr
                    }).into('historical_transaction').then(console.log('done one'))
                    }                   
            }

            //second item in object
            let query1 = await knex 
             
                .select('real_estate.re_id')
                .from('real_estate')
                .where('real_estate.addr', response.data.data[1].addr)
                .andWhere('catfathername', response.data.data[1].catfathername)
                .andWhere('catname', response.data.data[1].catname)
            if (query1.length >= 1) {
                let str = response.data.data[1].winloss
                let cleanStr = str.slice(0, str.length - 1)

                    console.log('information already there' + query1[0].re_id)

                    let htQuery = await knex
                    
                    .select('historical_transaction.id', 'historical_transaction.rootid','historical_transaction.re_id')
                    .from('historical_transaction')
                    .innerJoin('real_estate', 'historical_transaction.re_id', 'real_estate.re_id')
                    .where('historical_transaction.id', response.data.data[1].id)
                    .andWhere('real_estate.addr', response.data.data[1].addr)
                    .andWhere('real_estate.catfathername', response.data.data[1].catfathername)
                    .andWhere('real_estate.catname', response.data.data[1].catname)
                    .andWhere('historical_transaction.rootid', response.data.data[1].rootid)

                    if (htQuery.length >= 1 ) {
                        console.log("I've been inserted already")
                    } else {                
                
                    await knex
                    .insert({
                        re_id: query1[0].re_id,
                        id: response.data.data[1].id,
                        block: response.data.data[1].block,
                        rootid: response.data.data[1].rootid,
                        price_value: response.data.data[1].price_value,
                        date: response.data.data[1].date,
                        sq_price: response.data.data[1].sq_price_value,
                        winloss: cleanStr
                    }).into('historical_transaction').then(console.log('done 2'))
                }
                
            } else {
                let str = response.data.data[1].winloss
                let cleanStr = str.slice(0, str.length - 1)
                await knex
                    .insert({
                        addr: response.data.data[1].addr,
                        catfathername: response.data.data[1].catfathername,
                        catname: response.data.data[1].catname,
                        area: response.data.data[1].area
                    }).into('real_estate').returning('re_id')

                let htQuery1 = await knex
                    
                    .select('historical_transaction.id', 'historical_transaction.rootid','historical_transaction.re_id')
                    .from('historical_transaction')
                    .innerJoin('real_estate', 'historical_transaction.re_id', 'real_estate.re_id')
                    .where('id', response.data.data[1].id)
                    .andWhere('real_estate.addr',response.data.data[1].addr)
                    .andWhere('catfathername', response.data.data[1].catfathername)
                    .andWhere('catname', response.data.data[1].catname)
                    .andWhere('rootid', response.data.data[1].rootid)

                    if (htQuery1.length >= 1 ) {
                        console.log("I've been inserted already")
                    } else {

                        await knex
                         .insert({
                        re_id: htQuery1[0].re_id,
                        id: response.data.data[1].id,
                        block: response.data.data[1].block,
                        rootid: response.data.data[1].rootid,
                        price_value: response.data.data[1].price_value,
                        date: response.data.data[1].date,
                        sq_price: response.data.data[1].sq_price_value,
                        winloss: cleanStr
                    }).into('historical_transaction').then(console.log('done 2'))
                    }                   
            }

            //third item in object
            let query2 = await knex
                .select('real_estate.re_id')
                .from('real_estate')
                .where('real_estate.addr', response.data.data[2].addr)
                .andWhere('catfathername', response.data.data[2].catfathername)
                .andWhere('catname', response.data.data[2].catname)
            if (query2.length >= 1) {
                let str = response.data.data[2].winloss
                let cleanStr = str.slice(0, str.length - 1)

                    console.log('information already there' + query2[0].re_id)

                    let htQuery = await knex
                    
                    .select('historical_transaction.id', 'historical_transaction.rootid','historical_transaction.re_id')
                    .from('historical_transaction')
                    .innerJoin('real_estate', 'historical_transaction.re_id', 'real_estate.re_id')
                    .where('historical_transaction.id', response.data.data[2].id)
                    .andWhere('real_estate.addr', response.data.data[2].addr)
                    .andWhere('real_estate.catfathername', response.data.data[2].catfathername)
                    .andWhere('real_estate.catname', response.data.data[2].catname)
                    .andWhere('historical_transaction.rootid', response.data.data[2].rootid)

                    if (htQuery.length >= 1 ) {
                        console.log("I've been inserted already")
                    } else {



                await knex
                    .insert({
                        re_id: query2[0].re_id,
                        id: response.data.data[2].id,
                        block: response.data.data[2].block,
                        rootid: response.data.data[2].rootid,
                        price_value: response.data.data[2].price_value,
                        date: response.data.data[2].date,
                        sq_price: response.data.data[2].sq_price_value,
                        winloss: cleanStr
                    }).into('historical_transaction').then(console.log('done 3'))
                }
                
            } else {
                let str = response.data.data[2].winloss
                let cleanStr = str.slice(0, str.length - 1)
                await knex
                    .insert({
                        addr: response.data.data[2].addr,
                        catfathername: response.data.data[2].catfathername,
                        catname: response.data.data[2].catname,
                        area: response.data.data[2].area
                    }).into('real_estate').returning('re_id')
                let htQuery2 = await knex
                    
                    .select('historical_transaction.id', 'historical_transaction.rootid','historical_transaction.re_id')
                    .from('historical_transaction')
                    .innerJoin('real_estate', 'historical_transaction.re_id', 'real_estate.re_id')
                    .where('id', response.data.data[2].id)
                    .andWhere('real_estate.addr',response.data.data[2].addr)
                    .andWhere('catfathername', response.data.data[2].catfathername)
                    .andWhere('catname', response.data.data[2].catname)
                    .andWhere('rootid', response.data.data[2].rootid)

                    if (htQuery2.length >= 1 ) {
                        console.log("I've been inserted already")
                    } else {

                        await knex
                         .insert({
                        re_id: htQuery2[0].re_id,
                        id: response.data.data[2].id,
                        block: response.data.data[2].block,
                        rootid: response.data.data[2].rootid,
                        price_value: response.data.data[2].price_value,
                        date: response.data.data[2].date,
                        sq_price: response.data.data[2].sq_price_value,
                        winloss: cleanStr
                    }).into('historical_transaction').then(console.log('done 3'))
                    }                   
            }

            //first item in object
            let query3 = await knex
                .select('real_estate.re_id')
                .from('real_estate')
                .where('real_estate.addr', response.data.data[3].addr)
                .andWhere('catfathername', response.data.data[3].catfathername)
                .andWhere('catname', response.data.data[3].catname)
            if (query3.length >= 1) {
                let str = response.data.data[3].winloss
                let cleanStr = str.slice(0, str.length - 1)

                    console.log('information already there' + query3[0].re_id)
                    let htQuery = await knex
                    
                    .select('historical_transaction.id', 'historical_transaction.rootid','historical_transaction.re_id')
                    .from('historical_transaction')
                    .innerJoin('real_estate', 'historical_transaction.re_id', 'real_estate.re_id')
                    .where('historical_transaction.id', response.data.data[3].id)
                    .andWhere('real_estate.addr', response.data.data[3].addr)
                    .andWhere('real_estate.catfathername', response.data.data[3].catfathername)
                    .andWhere('real_estate.catname', response.data.data[3].catname)
                    .andWhere('historical_transaction.rootid', response.data.data[3].rootid)

                    if (htQuery.length >= 1 ) {
                        console.log("I've been inserted already")
                    } else {



                await knex
                    .insert({
                        re_id: query3[0].re_id,
                        id: response.data.data[3].id,
                        block: response.data.data[3].block,
                        rootid: response.data.data[3].rootid,
                        price_value: response.data.data[3].price_value,
                        date: response.data.data[3].date,
                        sq_price: response.data.data[3].sq_price_value,
                        winloss: cleanStr
                    }).into('historical_transaction').then(console.log('done 4'))
                }

                
            } else {
                let str = response.data.data[3].winloss
                let cleanStr = str.slice(0, str.length - 1)
                await knex
                    .insert({
                        addr: response.data.data[3].addr,
                        catfathername: response.data.data[3].catfathername,
                        catname: response.data.data[3].catname,
                        area: response.data.data[3].area
                    }).into('real_estate').returning('re_id')
                let htQuery3 = await knex
                    
                    .select('historical_transaction.id', 'historical_transaction.rootid','historical_transaction.re_id')
                    .from('historical_transaction')
                    .innerJoin('real_estate', 'historical_transaction.re_id', 'real_estate.re_id')
                    .where('id', response.data.data[3].id)
                    .andWhere('real_estate.addr',response.data.data[3].addr)
                    .andWhere('catfathername', response.data.data[3].catfathername)
                    .andWhere('catname', response.data.data[3].catname)
                    .andWhere('rootid', response.data.data[3].rootid)

                    if (htQuery3.length >= 1 ) {
                        console.log("I've been inserted already")
                    } else {

                        await knex
                         .insert({
                        re_id: htQuery3[0].re_id,
                        id: response.data.data[3].id,
                        block: response.data.data[3].block,
                        rootid: response.data.data[3].rootid,
                        price_value: response.data.data[3].price_value,
                        date: response.data.data[3].date,
                        sq_price: response.data.data[3].sq_price_value,
                        winloss: cleanStr
                    }).into('historical_transaction').then(console.log('done 4'))
                    }                   
            }

            //fourth item in object
            let query4 = await knex
                .select('real_estate.re_id')
                .from('real_estate')
                .where('real_estate.addr', response.data.data[4].addr)
                .andWhere('catfathername', response.data.data[4].catfathername)
                .andWhere('catname', response.data.data[4].catname)
            if (query4.length >= 1) {
                let str = response.data.data[4].winloss
                let cleanStr = str.slice(0, str.length - 1)
                    console.log('information already there' + query4[0].re_id)

                    let htQuery = await knex
                    
                    .select('historical_transaction.id', 'historical_transaction.rootid','historical_transaction.re_id')
                    .from('historical_transaction')
                    .innerJoin('real_estate', 'historical_transaction.re_id', 'real_estate.re_id')
                    .where('historical_transaction.id', response.data.data[0].id)
                    .andWhere('real_estate.addr', response.data.data[0].addr)
                    .andWhere('real_estate.catfathername', response.data.data[0].catfathername)
                    .andWhere('real_estate.catname', response.data.data[0].catname)
                    .andWhere('historical_transaction.rootid', response.data.data[0].rootid)

                    if (htQuery.length >= 1 ) {
                        console.log("I've been inserted already")
                    } else {

                await knex
                    .insert({
                        re_id: query4[0].re_id,
                        id: response.data.data[4].id,
                        block: response.data.data[4].block,
                        rootid: response.data.data[4].rootid,
                        price_value: response.data.data[4].price_value,
                        date: response.data.data[4].date,
                        sq_price: response.data.data[4].sq_price_value,
                        winloss: cleanStr
                    }).into('historical_transaction').then(console.log('done 5'))
                }
                
            } else {
                let str = response.data.data[4].winloss
                let cleanStr = str.slice(0, str.length - 1)
                 await knex
                    .insert({
                        addr: response.data.data[4].addr,
                        catfathername: response.data.data[4].catfathername,
                        catname: response.data.data[4].catname,
                        area: response.data.data[4].area
                    }).into('real_estate').returning('re_id')
                let htQuery4 = await knex
                    
                    .select('historical_transaction.id', 'historical_transaction.rootid','historical_transaction.re_id')
                    .from('historical_transaction')
                    .innerJoin('real_estate', 'historical_transaction.re_id', 'real_estate.re_id')
                    .where('id', response.data.data[4].id)
                    .andWhere('real_estate.addr',response.data.data[4].addr)
                    .andWhere('catfathername', response.data.data[4].catfathername)
                    .andWhere('catname', response.data.data[4].catname)
                    .andWhere('rootid', response.data.data[4].rootid)

                    if (htQuery4.length >= 1 ) {
                        console.log("I've been inserted already")
                    } else {

                        await knex
                         .insert({
                        re_id: htQuery4[0].re_id,
                        id: response.data.data[4].id,
                        block: response.data.data[4].block,
                        rootid: response.data.data[4].rootid,
                        price_value: response.data.data[4].price_value,
                        date: response.data.data[4].date,
                        sq_price: response.data.data[4].sq_price_value,
                        winloss: cleanStr
                    }).into('historical_transaction').then(console.log('done 5'))
                    }                   
            }

            //fifth item in object
            let query5 = await knex
                .select('real_estate.re_id')
                .from('real_estate')
                .where('real_estate.addr', response.data.data[5].addr)
                .andWhere('catfathername', response.data.data[5].catfathername)
                .andWhere('catname', response.data.data[5].catname)
            if (query5.length >= 1) {
                let str = response.data.data[5].winloss
                let cleanStr = str.slice(0, str.length - 1)
                    console.log('information already there' + query5[0].re_id)

                    let htQuery = await knex
                    
                    .select('historical_transaction.id', 'historical_transaction.rootid','historical_transaction.re_id')
                    .from('historical_transaction')
                    .innerJoin('real_estate', 'historical_transaction.re_id', 'real_estate.re_id')
                    .where('historical_transaction.id', response.data.data[5].id)
                    .andWhere('real_estate.addr', response.data.data[5].addr)
                    .andWhere('real_estate.catfathername', response.data.data[5].catfathername)
                    .andWhere('real_estate.catname', response.data.data[5].catname)
                    .andWhere('historical_transaction.rootid', response.data.data[5].rootid)

                    if (htQuery.length >= 1 ) {
                        console.log("I've been inserted already")
                    } else {

                await knex
                    .insert({
                        re_id: query5[0].re_id,
                        id: response.data.data[5].id,
                        block: response.data.data[5].block,
                        rootid: response.data.data[5].rootid,
                        price_value: response.data.data[5].price_value,
                        date: response.data.data[5].date,
                        sq_price: response.data.data[5].sq_price_value,
                        winloss: cleanStr
                    }).into('historical_transaction').then(console.log('done 6'))
                }
                
            } else {
                let str = response.data.data[5].winloss
                let cleanStr = str.slice(0, str.length - 1)
                await knex
                    .insert({
                        addr: response.data.data[5].addr,
                        catfathername: response.data.data[5].catfathername,
                        catname: response.data.data[5].catname,
                        area: response.data.data[5].area
                    }).into('real_estate').returning('re_id')
                let htQuery5 = await knex
                    
                    .select('historical_transaction.id', 'historical_transaction.rootid','historical_transaction.re_id')
                    .from('historical_transaction')
                    .innerJoin('real_estate', 'historical_transaction.re_id', 'real_estate.re_id')
                    .where('id', response.data.data[5].id)
                    .andWhere('real_estate.addr',response.data.data[5].addr)
                    .andWhere('catfathername', response.data.data[5].catfathername)
                    .andWhere('catname', response.data.data[5].catname)
                    .andWhere('rootid', response.data.data[5].rootid)

                    if (htQuery5.length >= 1 ) {
                        console.log("I've been inserted already")
                    } else {

                        await knex
                         .insert({
                        re_id: htQuery5[0].re_id,
                        id: response.data.data[5].id,
                        block: response.data.data[5].block,
                        rootid: response.data.data[5].rootid,
                        price_value: response.data.data[5].price_value,
                        date: response.data.data[5].date,
                        sq_price: response.data.data[5].sq_price_value,
                        winloss: cleanStr
                    }).into('historical_transaction').then(console.log('done 6'))
                    }                   
            }

            //sixth item in object
            let query6 = await knex
                .select('real_estate.re_id')
                .from('real_estate')
                .where('real_estate.addr', response.data.data[6].addr)
                .andWhere('catfathername', response.data.data[6].catfathername)
                .andWhere('catname', response.data.data[6].catname)
            if (query6.length >= 1) {
                let str = response.data.data[6].winloss
                let cleanStr = str.slice(0, str.length - 1)
                console.log('information already there' + query6[0].re_id)

                let htQuery = await knex
                    
                    .select('historical_transaction.id', 'historical_transaction.rootid','historical_transaction.re_id')
                    .from('historical_transaction')
                    .innerJoin('real_estate', 'historical_transaction.re_id', 'real_estate.re_id')
                    .where('historical_transaction.id', response.data.data[6].id)
                    .andWhere('real_estate.addr', response.data.data[6].addr)
                    .andWhere('real_estate.catfathername', response.data.data[6].catfathername)
                    .andWhere('real_estate.catname', response.data.data[6].catname)
                    .andWhere('historical_transaction.rootid', response.data.data[6].rootid)

                    if (htQuery.length >= 1 ) {
                        console.log("I've been inserted already")
                    } else {

                await knex
                    .insert({
                        re_id: query6[0].re_id,
                        id: response.data.data[6].id,
                        block: response.data.data[6].block,
                        rootid: response.data.data[6].rootid,
                        price_value: response.data.data[6].price_value,
                        date: response.data.data[6].date,
                        sq_price: response.data.data[6].sq_price_value,
                        winloss: cleanStr
                    }).into('historical_transaction').then(console.log('done 7'))
                }
                
            } else {
                let str = response.data.data[6].winloss
                let cleanStr = str.slice(0, str.length - 1)
                await knex
                    .insert({
                        addr: response.data.data[6].addr,
                        catfathername: response.data.data[6].catfathername,
                        catname: response.data.data[6].catname,
                        area: response.data.data[6].area
                    }).into('real_estate').returning('re_id')
                let htQuery6 = await knex
                    
                    .select('historical_transaction.id', 'historical_transaction.rootid','historical_transaction.re_id')
                    .from('historical_transaction')
                    .innerJoin('real_estate', 'historical_transaction.re_id', 'real_estate.re_id')
                    .where('id', response.data.data[6].id)
                    .andWhere('real_estate.addr',response.data.data[6].addr)
                    .andWhere('catfathername', response.data.data[6].catfathername)
                    .andWhere('catname', response.data.data[6].catname)
                    .andWhere('rootid', response.data.data[6].rootid)

                    if (htQuery6.length >= 1 ) {
                        console.log("I've been inserted already")
                    } else {

                        await knex
                         .insert({
                        re_id: htQuery6[0].re_id,
                        id: response.data.data[6].id,
                        block: response.data.data[6].block,
                        rootid: response.data.data[6].rootid,
                        price_value: response.data.data[6].price_value,
                        date: response.data.data[6].date,
                        sq_price: response.data.data[6].sq_price_value,
                        winloss: cleanStr
                    }).into('historical_transaction').then(console.log('done 7'))
                    }                   
            }

            //seventh item in object
            let query7 = await knex
                .select('real_estate.re_id')
                .from('real_estate')
                .where('real_estate.addr', response.data.data[7].addr)
                .andWhere('catfathername', response.data.data[7].catfathername)
                .andWhere('catname', response.data.data[7].catname)
            if (query7.length >= 1) {
                let str = response.data.data[7].winloss
                let cleanStr = str.slice(0, str.length - 1)

                    console.log('information already there' + query7[0].re_id)

                    let htQuery = await knex
                    
                    .select('historical_transaction.id', 'historical_transaction.rootid','historical_transaction.re_id')
                    .from('historical_transaction')
                    .innerJoin('real_estate', 'historical_transaction.re_id', 'real_estate.re_id')
                    .where('historical_transaction.id', response.data.data[7].id)
                    .andWhere('real_estate.addr', response.data.data[7].addr)
                    .andWhere('real_estate.catfathername', response.data.data[7].catfathername)
                    .andWhere('real_estate.catname', response.data.data[7].catname)
                    .andWhere('historical_transaction.rootid', response.data.data[7].rootid)

                    if (htQuery.length >= 1 ) {
                        console.log("I've been inserted already")
                    } else {


                    
                await knex
                    .insert({
                        re_id: query7[0].re_id,
                        id: response.data.data[7].id,
                        block: response.data.data[7].block,
                        rootid: response.data.data[7].rootid,
                        price_value: response.data.data[7].price_value,
                        date: response.data.data[7].date,
                        sq_price: response.data.data[7].sq_price_value,
                        winloss: cleanStr
                    }).into('historical_transaction').then(console.log('done 8'))

                }
                
            } else {
                let str = response.data.data[7].winloss
                let cleanStr = str.slice(0, str.length - 1)
                 await knex
                    .insert({
                        addr: response.data.data[7].addr,
                        catfathername: response.data.data[7].catfathername,
                        catname: response.data.data[7].catname,
                        area: response.data.data[7].area
                    }).into('real_estate').returning('re_id')
                let htQuery7 = await knex
                    
                    .select('historical_transaction.id', 'historical_transaction.rootid','historical_transaction.re_id')
                    .from('historical_transaction')
                    .innerJoin('real_estate', 'historical_transaction.re_id', 'real_estate.re_id')
                    .where('id', response.data.data[7].id)
                    .andWhere('real_estate.addr',response.data.data[7].addr)
                    .andWhere('catfathername', response.data.data[7].catfathername)
                    .andWhere('catname', response.data.data[7].catname)
                    .andWhere('rootid', response.data.data[7].rootid)

                    if (htQuery7.length >= 1 ) {
                        console.log("I've been inserted already")
                    } else {

                        await knex
                         .insert({
                        re_id: htQuery7[0].re_id,
                        id: response.data.data[7].id,
                        block: response.data.data[7].block,
                        rootid: response.data.data[7].rootid,
                        price_value: response.data.data[7].price_value,
                        date: response.data.data[7].date,
                        sq_price: response.data.data[7].sq_price_value,
                        winloss: cleanStr
                    }).into('historical_transaction').then(console.log('done 8'))
                    }                   
            }

            //eighth item in object
            let query8 = await knex
                .select('real_estate.re_id')
                .from('real_estate')
                .where('real_estate.addr', response.data.data[8].addr)
                .andWhere('catfathername', response.data.data[8].catfathername)
                .andWhere('catname', response.data.data[8].catname)
            if (query8.length >= 1) {
                let str = response.data.data[8].winloss
                let cleanStr = str.slice(0, str.length - 1)

            
                    console.log('information already there' + query8[0].re_id)

                    let htQuery = await knex
                    
                    .select('historical_transaction.id', 'historical_transaction.rootid','historical_transaction.re_id')
                    .from('historical_transaction')
                    .innerJoin('real_estate', 'historical_transaction.re_id', 'real_estate.re_id')
                    .where('historical_transaction.id', response.data.data[8].id)
                    .andWhere('real_estate.addr', response.data.data[8].addr)
                    .andWhere('real_estate.catfathername', response.data.data[8].catfathername)
                    .andWhere('real_estate.catname', response.data.data[8].catname)
                    .andWhere('historical_transaction.rootid', response.data.data[8].rootid)

                    if (htQuery.length >= 1 ) {
                        console.log("I've been inserted already")
                    } else {

                await knex
                    .insert({
                        re_id: query8[0].re_id,
                        id: response.data.data[8].id,
                        block: response.data.data[8].block,
                        rootid: response.data.data[8].rootid,
                        price_value: response.data.data[8].price_value,
                        date: response.data.data[8].date,
                        sq_price: response.data.data[8].sq_price_value,
                        winloss: cleanStr
                    }).into('historical_transaction').then(console.log('done 9'))
                }
                
            } else {
                let str = response.data.data[8].winloss
                let cleanStr = str.slice(0, str.length - 1)
                await knex
                    .insert({
                        addr: response.data.data[8].addr,
                        catfathername: response.data.data[8].catfathername,
                        catname: response.data.data[8].catname,
                        area: response.data.data[8].area
                    }).into('real_estate').returning('re_id')
                let htQuery8 = await knex
                    
                    .select('historical_transaction.id', 'historical_transaction.rootid','historical_transaction.re_id')
                    .from('historical_transaction')
                    .innerJoin('real_estate', 'historical_transaction.re_id', 'real_estate.re_id')
                    .where('id', response.data.data[8].id)
                    .andWhere('real_estate.addr',response.data.data[8].addr)
                    .andWhere('catfathername', response.data.data[8].catfathername)
                    .andWhere('catname', response.data.data[8].catname)
                    .andWhere('rootid', response.data.data[8].rootid)

                    if (htQuery8.length >= 1 ) {
                        console.log("I've been inserted already")
                    } else {

                        await knex
                         .insert({
                        re_id: htQuery8[0].re_id,
                        id: response.data.data[8].id,
                        block: response.data.data[8].block,
                        rootid: response.data.data[8].rootid,
                        price_value: response.data.data[8].price_value,
                        date: response.data.data[8].date,
                        sq_price: response.data.data[8].sq_price_value,
                        winloss: cleanStr
                    }).into('historical_transaction').then(console.log('done 9'))
                    }                   
            }

            //ninth item in object
            let query9 = await knex
                .select('real_estate.re_id')
                .from('real_estate')
                .where('real_estate.addr', response.data.data[9].addr)
                .andWhere('catfathername', response.data.data[9].catfathername)
                .andWhere('catname', response.data.data[9].catname)
            if (query.length >= 1) {
                let str = response.data.data[9].winloss
                let cleanStr = str.slice(0, str.length - 1)


                    console.log('information already there' + query9[0].re_id)
                    let htQuery = await knex
                    
                    .select('historical_transaction.id', 'historical_transaction.rootid','historical_transaction.re_id')
                    .from('historical_transaction')
                    .innerJoin('real_estate', 'historical_transaction.re_id', 'real_estate.re_id')
                    .where('historical_transaction.id', response.data.data[0].id)
                    .andWhere('real_estate.addr', response.data.data[0].addr)
                    .andWhere('real_estate.catfathername', response.data.data[0].catfathername)
                    .andWhere('real_estate.catname', response.data.data[0].catname)
                    .andWhere('historical_transaction.rootid', response.data.data[0].rootid)

                    if (htQuery.length >= 1 ) {
                        console.log("I've been inserted already")
                    } else {

                await knex
                    .insert({
                        re_id: query9[0].re_id,
                        id: response.data.data[9].id,
                        block: response.data.data[9].block,
                        rootid: response.data.data[9].rootid,
                        price_value: response.data.data[9].price_value,
                        date: response.data.data[9].date,
                        sq_price: response.data.data[9].sq_price_value,
                        winloss: cleanStr
                    }).into('historical_transaction').then(console.log('done 10'))
                }
                
            } else {
                let str = response.data.data[9].winloss
                let cleanStr = str.slice(0, str.length - 1)
                 await knex
                    .insert({
                        addr: response.data.data[9].addr,
                        catfathername: response.data.data[9].catfathername,
                        catname: response.data.data[9].catname,
                        area: response.data.data[9].area
                    }).into('real_estate').returning('re_id')
                let htQuery9 = await knex
                    
                    .select('historical_transaction.id', 'historical_transaction.rootid','historical_transaction.re_id')
                    .from('historical_transaction')
                    .innerJoin('real_estate', 'historical_transaction.re_id', 'real_estate.re_id')
                    .where('id', response.data.data[9].id)
                    .andWhere('real_estate.addr',response.data.data[9].addr)
                    .andWhere('catfathername', response.data.data[9].catfathername)
                    .andWhere('catname', response.data.data[9].catname)
                    .andWhere('rootid', response.data.data[9].rootid)

                    if (htQuery9.length >= 1 ) {
                        console.log("I've been inserted already")
                    } else {

                        await knex
                         .insert({
                        re_id: htQuery9[0].re_id,
                        id: response.data.data[9].id,
                        block: response.data.data[9].block,
                        rootid: response.data.data[9].rootid,
                        price_value: response.data.data[9].price_value,
                        date: response.data.data[9].date,
                        sq_price: response.data.data[9].sq_price_value,
                        winloss: cleanStr
                    }).into('historical_transaction').then(console.log('done 10'))
                    }                   
            }

    } catch (err) {
        console.log(err);
    };
};



async function getData(num) {
    for (let i = 0; i < 50; i++) {
                    await getTransactionHistory(i, num)
    }
}
//  file.end();   


// getData(1).then(getData(2)).then(getData(3)).then(getData(170))

getData(1)
getData(2)
getData(3)
getData(170)



