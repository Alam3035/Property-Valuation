// historical trans

var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

const asyncModule = require('async');

require('dotenv').config(); //Define Enniroments
const NODE_ENV = process.env.NODE_ENV || 'development' 
const knexFile = require('../knexfile')[NODE_ENV] // Connect to DB
const knex = require('knex')(knexFile)
//consider the query number?

//data stream hong kong

let instream = fs.createReadStream('./data/28housefinal1.csv');
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

    // //data stream kowloon

    // let instream1 = fs.createReadStream('./data/28housefinal2.csv');
    // let outstream1 = new stream;
    // outstream1.readable = true;
    // outstream1.writeable = true;

    // var rl1 = readline.createInterface({
    //     input: instream1,
    //     output: outstream1,
    //     terminal: false
    // });

    // const asyncQueue1 = asyncModule.queue(async function(his_trans_data1, cb1) {
    //     await
    //     console.log(his_trans_data1);
    //     let query1 = await knex
    //     .select('re_id')
    //     .from('real_estate')
    //     .where('real_estate.addr', his_trans_data1.addr)
    //     .andWhere('catfathername', his_trans_data1.catfathername)
    //     .andWhere('catname', his_trans_data1.catname)
        
    //         console.log('do i work?');
    //         console.log(query1[0].re_id)

    //         return await knex
    //             .insert({
    //                 re_id: query1[0].re_id,

    //                 id: his_trans_data1.id,

    //                 block: his_trans_data1.block,

    //                 rootid: his_trans_data1.rootid,

    //                 price_value: his_trans_data1.price_value,

    //                 date: his_trans_data1.date,

    //                 sq_price: his_trans_data1.sq_price,

    //                 winloss: his_trans_data1.winloss,

    //                 img_url: his_trans_data1.img_url

    //             }).into('historical_transaction')
                        
    // }, 15);

    // rl1.on('line', function (line1) {
    //     let his_trans_data1 = line1.split(",")
    //     asyncQueue1.push({
    //         id: his_trans_data1[0],
    //         addr: his_trans_data1[1],
    //         catfathername: his_trans_data1[2],
    //         catname: his_trans_data1[3],
    //         block: his_trans_data1[4],
    //         rootid: his_trans_data1[5],
    //         price_value: his_trans_data1[6],
    //         date: his_trans_data1[7],
    //         sq_price: his_trans_data1[8],
    //         winloss: his_trans_data1[10],
    //         img_url: his_trans_data1[11],
    //     })
    // });

    // //data stream new territories

    // let instream2 = fs.createReadStream('./data/28housefinal3.csv');
    // let outstream2 = new stream;
    // outstream2.readable = true;
    // outstream2.writeable = true;

    // var rl2 = readline.createInterface({
    //     input: instream2,
    //     output: outstream2,
    //     terminal: false
    // });

    // const asyncQueue2 = asyncModule.queue(async function(his_trans_data2, cb2) {
    //     await
    //     console.log(his_trans_data2);
    //     let query2 = await knex
    //     .select('re_id')
    //     .from('real_estate')
    //     .where('real_estate.addr', his_trans_data2.addr)
    //     .andWhere('catfathername', his_trans_data2.catfathername)
    //     .andWhere('catname', his_trans_data2.catname)
        
    //         console.log('do i work?');
    //         console.log(query2[0].re_id)

    //         return await knex
    //             .insert({
    //                 re_id: query2[0].re_id,

    //                 id: his_trans_data2.id,

    //                 block: his_trans_data2.block,

    //                 rootid: his_trans_data2.rootid,

    //                 price_value: his_trans_data2.price_value,

    //                 date: his_trans_data2.date,

    //                 sq_price: his_trans_data2.sq_price,

    //                 winloss: his_trans_data2.winloss,

    //                 img_url: his_trans_data2.img_url

    //             }).into('historical_transaction')
                        
    // }, 15);

    // rl2.on('line', function (line2) {
    //     let his_trans_data2 = line2.split(",")
    //     asyncQueue2.push({
    //         id: his_trans_data2[0],
    //         addr: his_trans_data2[1],
    //         catfathername: his_trans_data2[2],
    //         catname: his_trans_data2[3],
    //         block: his_trans_data2[4],
    //         rootid: his_trans_data2[5],
    //         price_value: his_trans_data2[6],
    //         date: his_trans_data2[7],
    //         sq_price: his_trans_data2[8],
    //         winloss: his_trans_data2[10],
    //         img_url: his_trans_data2[11],
    //     })
    // });

    // //data stream lantau

    // let instream3 = fs.createReadStream('./data/28housefinal170.csv');
    // let outstream3 = new stream;
    // outstream3.readable = true;
    // outstream3.writeable = true;

    // var rl3 = readline.createInterface({
    //     input: instream3,
    //     output: outstream3,
    //     terminal: false
    // });

    // const asyncQueue3 = asyncModule.queue(async function(his_trans_data3, cb3) {
    //     await
    //     console.log(his_trans_data3);
    //     let query3 = await knex
    //     .select('re_id')
    //     .from('real_estate')
    //     .where('real_estate.addr', his_trans_data3.addr)
    //     .andWhere('catfathername', his_trans_data3.catfathername)
    //     .andWhere('catname', his_trans_data3.catname)
        
    //         console.log('do i work?');
    //         console.log(query3[0].re_id)

    //         return await knex
    //             .insert({
    //                 re_id: query3[0].re_id,

    //                 id: his_trans_data3.id,

    //                 block: his_trans_data3.block,

    //                 rootid: his_trans_data3.rootid,

    //                 price_value: his_trans_data3.price_value,

    //                 date: his_trans_data3.date,

    //                 sq_price: his_trans_data3.sq_price,

    //                 winloss: his_trans_data3.winloss,

    //                 img_url: his_trans_data3.img_url

    //             }).into('historical_transaction')
                        
    // }, 15);

    // rl3.on('line', function (line3) {
    //     let his_trans_data3 = line3.split(",")
    //     asyncQueue3.push({
    //         id: his_trans_data3[0],
    //         addr: his_trans_data3[1],
    //         catfathername: his_trans_data3[2],
    //         catname: his_trans_data3[3],
    //         block: his_trans_data3[4],
    //         rootid: his_trans_data3[5],
    //         price_value: his_trans_data3[6],
    //         date: his_trans_data3[7],
    //         sq_price: his_trans_data3[8],
    //         winloss: his_trans_data3[10],
    //         img_url: his_trans_data3[11],
    //     })
    // });