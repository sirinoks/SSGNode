const fs = require('fs')
const { exit } = require('process')

//if folder/file doesn't exist, create it
function mkExist(toCreate, ifFolder = true) {
    try {
        if (!fs.existsSync(toCreate)) {
            if (ifFolder) {
                fs.mkdirSync(toCreate);
            } else {
                fs.writeFileSync(toCreate, "utf8");
            }
        }
    } catch (err) {
        console.log(`Error when creating a ${ifFolder ? "folder" : "file"} ${toCreate}.`);
        console.log(err);
        exit(-1);
    }
}

module.exports = { mkExist };