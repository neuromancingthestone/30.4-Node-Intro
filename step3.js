const axios = require('axios');
const URL = require('url').URL;
const fs = require('fs');

const arg1 = process.argv[2];
const arg2 = process.argv[3];
const arg3 = process.argv[4];

function cat(inFile, outFile='') {
    if(outFile == '') {
        fs.readFile(inFile, 'utf8', (err, data) => {
            if(err) {
                console.log("Error: ", err);
                process.kill(1);
            }
            console.log(data);
        })        
    } else {
        fs.readFile(inFile, 'utf8', (err, data) => {
            if(err) {
                console.log("Error: ", err);
                process.kill(1);
            }
            fs.writeFile(outFile, data, { encoding: 'utf8', flag: 'w' }, err =>{
                if(err) {
                console.log("ERROR!", err);
                process.kill(2);
                }
                console.log(`no output, but ${outFile} contains contents of ${inFile}`);
            })        
        })
    }
}

async function webCat(url, outFile='') {
    await axios.get(url).then(res => {
        if(outFile == '') {
            console.log(res.data);
        } else {
            fs.writeFile(outFile, res.data, { encoding: 'utf8', flag: 'w' }, err =>{
                if(err) {
                  console.log("ERROR!", err);
                  process.kill(2);
                }
                console.log(`no output, but ${outFile} contains ${url}'s HTML`);
            })
        }
    })
    .catch(function (error) {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            let errStatus = (error.response.status);
            console.log(`Error fetching ${url}: \n
            Error: Request failed with status code: ${errStatus}`);
        } else if (error.request) {
            // The request was made but no response was received
            // `error.request` is an instance of XMLHttpRequest in the browser 
            // and an instance of http.ClientRequest in node.js
            console.log(error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.log('Error', error.message);
        }
    });    
}

const isValidUrl = (s) => {
    try{
        new URL(s);
        return true;
    } catch (err) {
        return false;
    }
};

if(arg1 == '--out') {
    if(isValidUrl(arg3)) {
        webCat(arg3, arg2);
    } else {
        cat(arg3, arg2);
    }
    //    webCat(fileName);
} else {
    if(isValidUrl(arg1)) {
        webCat(arg1);
    } else {
        cat(arg1);
    }
}