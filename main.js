'use strict'

async function getListings(pageNum, dataStr) {

const request = require('request-promise-native');

    let results = [];

    const headers = {
        'Origin': 'https://www.realtor.ca',
        'Accept-Encoding': 'gzip, deflate, br',
        'Accept-Language': 'en-US,en;q=0.9',
        'User-Agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Ubuntu Chromium/71.0.3578.80 Chrome/71.0.3578.80 Safari/537.36',
        'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
        'Accept': '*/*', 
        'Referer': 'https://www.realtor.ca/map',
        'Connection': 'keep-alive'
    };

    const options = {
        url: 'https://api2.realtor.ca/Listing.svc/PropertySearch_Post',
        method: 'POST',
        headers: headers,
        gzip: true,
        json: true,
        body: dataStr + pageNum
    };
        
    return await request(options);            
}


async function getMultipleListings(pageStart, pageEnd, dataStr) {

    let results = [];

    for(let i = pageStart; i < pageEnd; i++) {

        const chunk = await getListings(i, dataStr); 
        const res = chunk['Results'];
        if(res.length > 0)
            results = results.concat(res);        
    }
    
    return JSON.stringify(results);
}

async function downloadListings(pageStart, pageEnd, outputDir, dataStr) {

    const results = await getMultipleListings(pageStart, pageEnd, dataStr);
    const fs = require('fs');
    const dateStr = (new Date()).toISOString().substring(0,10);
    
    fs.writeFile(`${outputDir}/${dateStr}-p${pageStart}-p${pageEnd-1}.txt`, results, (err) => console.log(err)); 
}

//module.exports = downloadListings;

const params = process.argv.slice(-4);
const pageStart = params[1];
const pageEnd = params[2];
const outputDir = params[3];

const re = /&CurrentPage=\d+/;
const dataStr = new String(params[0]).replace(re, "") + '&CurrentPage=';
console.log("\ndata", dataStr);
console.log('pages:', `${pageStart}-${pageEnd}`);
console.log('outpurDir:', outputDir);

downloadListings(pageStart, pageEnd, outputDir, dataStr);











