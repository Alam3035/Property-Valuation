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

const getTransactionHistory = async function (i, num, callback) {
    console.log(i)
    try {
        let response = await axios.post('https://data.28hse.com/en/webservice', `draw=7&columns%5B0%5D%5Bdata%5D=date&columns%5B0%5D%5Bname%5D=&columns%5B0%5D%5Bsearchable%5D=true&columns%5B0%5D%5Borderable%5D=false&columns%5B0%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B0%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B1%5D%5Bdata%5D=catfathername&columns%5B1%5D%5Bname%5D=&columns%5B1%5D%5Bsearchable%5D=true&columns%5B1%5D%5Borderable%5D=false&columns%5B1%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B1%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B2%5D%5Bdata%5D=catname&columns%5B2%5D%5Bname%5D=&columns%5B2%5D%5Bsearchable%5D=true&columns%5B2%5D%5Borderable%5D=false&columns%5B2%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B2%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B3%5D%5Bdata%5D=price&columns%5B3%5D%5Bname%5D=&columns%5B3%5D%5Bsearchable%5D=true&columns%5B3%5D%5Borderable%5D=false&columns%5B3%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B3%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B4%5D%5Bdata%5D=winloss&columns%5B4%5D%5Bname%5D=&columns%5B4%5D%5Bsearchable%5D=true&columns%5B4%5D%5Borderable%5D=false&columns%5B4%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B4%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B5%5D%5Bdata%5D=area&columns%5B5%5D%5Bname%5D=&columns%5B5%5D%5Bsearchable%5D=true&columns%5B5%5D%5Borderable%5D=false&columns%5B5%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B5%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B6%5D%5Bdata%5D=sq_price&columns%5B6%5D%5Bname%5D=&columns%5B6%5D%5Bsearchable%5D=true&columns%5B6%5D%5Borderable%5D=false&columns%5B6%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B6%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B7%5D%5Bdata%5D=addr&columns%5B7%5D%5Bname%5D=&columns%5B7%5D%5Bsearchable%5D=true&columns%5B7%5D%5Borderable%5D=false&columns%5B7%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B7%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B8%5D%5Bdata%5D=contract&columns%5B8%5D%5Bname%5D=&columns%5B8%5D%5Bsearchable%5D=true&columns%5B8%5D%5Borderable%5D=false&columns%5B8%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B8%5D%5Bsearch%5D%5Bregex%5D=false&columns%5B9%5D%5Bdata%5D=addr&columns%5B9%5D%5Bname%5D=&columns%5B9%5D%5Bsearchable%5D=true&columns%5B9%5D%5Borderable%5D=false&columns%5B9%5D%5Bsearch%5D%5Bvalue%5D=&columns%5B9%5D%5Bsearch%5D%5Bregex%5D=false&start=${i * 10}&length=10&search%5Bvalue%5D=&search%5Bregex%5D=false&cmd=area_deals&area_id=${num}`, config); // implement a function to get all four areas ${num}
        console.log(response.data.data.map(i => i.id));
        // let responseData = [];


        let columns = {
            id: 'id',
            addr: 'addr',
            catfathername: 'catfathername',
            catname: 'catname',
            block: 'block',
            rootid: 'rootid',
            price_value: 'price_value',
            date: 'date',
            sq_price_value: 'sq_price_value',
            area: 'area',
            winloss: 'winloss'
        };

        //     for (var i = 0; i < 20; i++) {
        //   response.data.data.push([i, 'Name ' + i]);
        // }

        let query = await knex
            .select('re_id')
            .from('real_estate')
            .where('real_estate.addr', columns.addr)
            .andWhere('catfathername', columns.catfathername)
            .andWhere('catname', columns.catname)
        if (query.length >= 1) {
            console.log('information already there' + query[0].re_id)
            .insert({
                re_id: query[0].re_id,
                id: columns.id,
                block: columns.block,
                rootid: columns.rootid,
                price_value: columns.price_value,
                date: columns.date,
                sq_price_value: columns.sq_price_value,
                winloss: columns.winloss,
            }).into('historical_transaction')

        } else {
            // console.log('writing to knex')
            return await knex
                .insert({
                    addr: columns.addr,
                    catfathername: columns.catfathername,
                    catname: columns.catname,
                    area: columns.area
                }).into('real_estate').then()

                let query1 = await knex
                .select('re_id')
                .from('real_estate')
                .where('real_estate.addr', columns.addr)
                .andWhere('catfathername', columns.catfathername)
                .andWhere('catname', columns.catname)

                .insert({
                    re_id: query1[0].re_id,
                    id: columns.id,
                    block: columns.block,
                    rootid: columns.rootid,
                    price_value: columns.price_value,
                    date: columns.date,
                    sq_price_value: columns.sq_price_value,
                    winloss: columns.winloss,
                }).into('historical_transaction')
        }


        // stringify(response.data.data, { header: false, columns: columns }, (err, output) => {
        //     if (err) throw err;
        //     fs.appendFile('data.csv', output, (err) => {
        //         if (err) throw err;
        //         console.log('data.csv saved.');
        //     });
        // });

    } catch (err) {
        console.log(err);
    };

};

async function getData() {
    for (let i = 0; i < 200; i++) {
        const num = [1, 2, 3, 170]


        await getTransactionHistory(i, forEach(num))
    }
}
//  file.end();   


getData();
