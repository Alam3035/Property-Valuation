// historical trans

var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

const asyncModule = require('async');

require('dotenv').config(); //Define Enniroments
const NODE_ENV = process.env.NODE_ENV || 'development' 
const knexFile = require('../knexfile')[NODE_ENV] // Connect to DB
const knex = require('knex')(knexFile)

let instream = fs.createReadStream('./recent_data.csv');
let outstream = new stream;
outstream.readable = true;
outstream.writeable = true;

var rl = readline.createInterface({
    input: instream,
    output: outstream,
    terminal: false
});

const asyncQueue = asyncModule.queue(async function(his_trans_data, cb) {
    await
    console.log(his_trans_data);
    let query = await knex
    .select('re_id')
    .from('real_estate')
    .where('real_estate.addr', his_trans_data.addr)
    .andWhere('catfathername', his_trans_data.catfathername)
    .andWhere('catname', his_trans_data.catname)
    
        console.log('do i work?');
        console.log(query[0].re_id)

        return await knex
            .insert({
                re_id: query[0].re_id,

                id: his_trans_data.id,

                block: his_trans_data.block,

                rootid: his_trans_data.rootid,

                price_value: his_trans_data.price_value,

                date: his_trans_data.date,

                sq_price: his_trans_data.sq_price,

                winloss: his_trans_data.winloss,

                img_url: his_trans_data.img_url

            }).into('historical_transaction')
                    
}, 15);

rl.on('line', function (line) {
    let his_trans_data = line.split(",")
    asyncQueue.push({
        id: his_trans_data[0],
        addr: his_trans_data[1],
        catfathername: his_trans_data[2],
        catname: his_trans_data[3],
        block: his_trans_data[4],
        rootid: his_trans_data[5],
        price_value: his_trans_data[6],
        date: his_trans_data[7],
        sq_price: his_trans_data[8],
        winloss: his_trans_data[10],
        img_url: his_trans_data[11],
    })
});