const fs = require('fs')
const axios = require('axios')
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

async function webCat(path){
    const {data} = await axios.get(path)
    console.log(data)
}

try{
    new URL(p)
    webCat(p)
}catch{
    cat(p)
}
