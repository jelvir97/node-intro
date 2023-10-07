const fs = require('fs')
const p = process.argv[2]

function cat(path){
    fs.readFile(path,'utf8', (err,data) =>{
        if (err) {
            console.error('Error: ',err);
            process.exit(1);
          }
        console.log(data)
    })

}

cat(p)