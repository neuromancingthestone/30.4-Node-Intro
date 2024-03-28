const axios = require('axios');
const URL = require('url').URL;
const fs = require('fs');

const fileName = process.argv[2];

function cat(file) {
    fs.readFile(file, 'utf8', (err, data) => {
        if(err) {
            console.log("Error: ", err);
            process.kill(1);
        }
        console.log(data);
    })
}

async function webCat(url) {
    await axios.get(url).then(res => {
        console.log(res.data);
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

if(isValidUrl(fileName)) {
    webCat(fileName);
} else {
    cat(fileName);
}