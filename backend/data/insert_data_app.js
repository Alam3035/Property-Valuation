// real_estate
// to amke this faster, make maybe rl up to 3 
//read 3 seperate files

var fs = require('fs');
var readline = require('readline');
var stream = require('stream');

const asyncModule = require('async');

require('dotenv').config(); //Define Enniroments
const NODE_ENV = process.env.NODE_ENV || 'development' 
const knexFile = require('../knexfile')[NODE_ENV] // Connect to DB
const knex = require('knex')(knexFile)


//data stream hong kong
let instream = fs.createReadStream('./recent_data.csv');
let outstream = new stream;
outstream.readable = true;
outstream.writeable = true;

var rl = readline.createInterface({
    input: instream,
    output: outstream,
    terminal: false
});

const asyncQueue =  asyncModule.queue(async function(real_estate_data, cb) {
    await 
    console.log(real_estate_data);
    let query = await knex
    .select()
    .from('real_estate')
    .where('real_estate.addr', real_estate_data.addr)
    .andWhere('catfathername', real_estate_data.catfathername)
    .andWhere('catname', real_estate_data.catname)
    if(query.length >= 1 ) {
        console.log('information already there' + query[0].re_id)
    } else {
        // console.log('writing to knex')
        return await knex
            .insert({
                addr: real_estate_data.addr,
                catfathername: real_estate_data.catfathername,
                catname: real_estate_data.catname,
                area: real_estate_data.area
            }).into('real_estate')
    }

    return cb;
  
},1);

rl.on('line', function (line) {
    let real_estate_data = line.split(",")
    asyncQueue.push({
            addr: real_estate_data[1],
            catfathername: real_estate_data[2],
            catname: real_estate_data[3],
            area: real_estate_data[9],
    })
});

// let instream3 = fs.createReadStream('./data/28housefinal170.csv');
// let outstream3 = new stream;
// outstream3.readable = true;
// outstream3.writeable = true;

// var rl3 = readline.createInterface({
//     input: instream3,
//     output: outstream3,
//     terminal: false
// });

// const asyncQueue3 = asyncModule.queue(async function(real_estate_data3, cb3) {
//     await 
//     console.log(real_estate_data3);
//     let query3 = await knex
//     .select()
//     .from('real_estate')
//     .where('real_estate.addr', real_estate_data3.addr)
//     .andWhere('catfathername', real_estate_data3.catfathername)
//     .andWhere('catname', real_estate_data3.catname)
//     if(query.length3 >= 1 ) {
//         console.log('information already there' + query3[0])
//     } else {
//         // console.log('writing to knex')
//         return await knex
//             .insert({
//                 addr: real_estate_data3.addr,
//                 catfathername: real_estate_data3.catfathername,
//                 catname: real_estate_data3.catname,
//                 area: real_estate_data3.area
//             }).into('real_estate')
//     }

//     return cb3;

// },1);

// rl3.on('line', function (line3) {
//     let real_estate_data3 = line3.split(",")
//     asyncQueue3.push({
//             addr: real_estate_data3[1],
//             catfathername: real_estate_data3[2],
//             catname: real_estate_data3[3],
//             area: real_estate_data3[9],
//     })
// });