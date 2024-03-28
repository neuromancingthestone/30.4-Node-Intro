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

cat(fileName);