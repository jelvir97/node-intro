const fs = require('fs')
const axios = require('axios')
const p = process.argv[2]


async function cat(path){
    console.log(path)
    // fs.readFile(path,'utf8', (err,data) =>{
    //     if (err) {
    //         console.log('inside cat error')
    //         console.error('Error: ',err);
    //         process.exit(1);
    //       }
    //     console.log(data)
    //     return data
    // })

    try {
        let contents = fs.readFileSync(path, 'utf8');
        console.log(`file contents are "${contents}"`);
        return contents
      } catch (error){

        console.error(error);
        process.exit(1);
      }

}

async function webCat(path){
    const {data} = await axios.get(path)
    return data
}

function writeFromCommandLine(contents){
    try{
        fs.writeFileSync(process.argv[3], contents)
        console.log('SUCCESS!')

    } catch(err){
        console.log('Could not write file at directory: ',process.argv[3])
        console.log(err)
    }

}

async function out(){
    try{
        new URL(process.argv[4])
        const contents = await webCat(process.argv[4]) 
        writeFromCommandLine(contents)
    }catch{
        console.log('str going into cat: ', process.argv[4])
        const contents = await cat(process.argv[4])
        console.log('inside catch')
        console.log(contents)
        writeFromCommandLine(contents)
    }

}

if(p==='--out'){

    out()

}else{
    try{
        new URL(p)
        webCat(p)
    }catch{
        cat(p)
    }
}


