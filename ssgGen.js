const fs = require('fs')
const path = require('path')
const { exit } = require('process')
const { name, version } = require('../SSGNode/package.json')

let sourcePath = "./Sherlock Holmes Selected Stories/The Adventure of the Six Napoleans.txt"
let endPath = "./dist"
let lang = "en"
let config = ""

function run(sourcePath, lang, config) {
    let texts = "";
    let title = "";
    let html = "";
    if (config)
        configReader(config);

    if (fs.lstatSync(sourcePath).isDirectory()) {
        try {
            fs.readdir(sourcePath, (err, files) => {
                if (err) {
                    throw err;
                }
                files.forEach(function (file) {
                    if (file.match(".*(\.txt|\.md)$")) {
                        console.log(file);
                        console.log("File mathched:");
                        console.log(file);
                        let contentArray = readFile(`${sourcePath}/${file}`)
                        pageGenerator(contentArray)
                    }
                })
            })
        } catch (err) {
            console.log(`Error when reading a directory in ${sourcePath}.`);
            console.log(err);
            exit(-1);
        }
    } else {
        try {
            let contentArray = readFile(sourcePath);
            pageGenerator(contentArray, lang);
        } catch (err) {
            console.log(`Error when reading a file in ${sourcePath}.`);
            console.log(err);
            exit(-1);
        }
    }
    console.log("Website generated");
    exit(0);
}

function readFile(file) {
    if (file.match(".*(\.txt|\.md)$")) {
        //read the file
        let fullText = fs.readFileSync(file, 'utf8');
        //formatting if it's an .md file
        if (file.match(".*(\.md)$")) {
            //replacing strings
            fullText = fullText.replace(/_ /g, "<i>")
            fullText = fullText.replace(/ _/g, "</i>")
            fullText = fullText.replace(/__ /g, "<b>")
            fullText = fullText.replace(/ __/g, "</b>")
            fullText = fullText.replace(/### /g, "<h3>")
            fullText = fullText.replace(/ ###/g, "</h3>")
            fullText = fullText.replace(/## /g, "<h2>")
            fullText = fullText.replace(/ ##/g, "</h2>")
            fullText = fullText.replace(/# /g, "<h1>")
            fullText = fullText.replace(/ #/g, "</h1>")

            fullText = fullText.replace(/---/g, "<hr>")
        }
        //future functionality of choosing the element you want to use
        let element = "p";

        //divide text into paragraphs
        const paragraphs = fullText.split(/\r?\n\r?\n/);

        let title = paragraphs[0];
        let htmlParagraphsArray = [];

        //put them all into an array
        for (let i = 0; i < paragraphs.length; i++) {
            if (i == 0)//only the first paragraph is the title
                htmlParagraphsArray.push(`<h1>${title}</h1>`);
            else {
                htmlParagraphsArray.push(`<${element}>${paragraphs[i]}</${element}>`);
            }
        }

        //put them all into a single string, every paragraph starts from a new line
        texts = htmlParagraphsArray.join('\n');
        return { "texts": texts, "title": title };
    }
}

function pageGenerator(contentArray, lang) {
    try {
        html = genPage(contentArray["texts"], contentArray["title"]);
    } catch (err) {
        console.log(`Error when generating an html file for ${contentArray["title"]}.`);
        console.log(err);
        exit(-1);
    }
    output(html);
}

function genPage(texts, title, lang) {
    const html = `
  <!DOCTYPE html>
  <html lang="${lang}">
  <head>
  <style>
  @import url('https://fonts.googleapis.com/css2?family=Lato:wght@300&display=swap');
  </style>
  <link rel="stylesheet" href="./styles.css">
  <title>${title}</title>
  </head>
  <body>
  <div class="container">
  ${texts}
  </div>
  </body>
  </html>
  `;
    return html;
}

function output(html) {
    mkExist(endPath);
    deleteFiles(endPath);
    generateFile(html);
    genCss(endPath);
}

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

//to remove all previous files
function deleteFiles(folder) {
    try {
        fs.rmSync(folder, { recursive: true }, err => {
            if (err) throw { err };
        });
    } catch (err) {
        console.log(`Error when deleting files in ${folder}.`);
        console.log(err);
        exit(-1);
    }
}

function generateFile(html) {
    mkExist(endPath);

    try {
        fs.writeFileSync(`${endPath}/output.html`, html, function (err) {
            if (err) {
                return console.log(err);
            }
            console.log("web page generated");
        });
    } catch (err) {
        console.log(`Error when creating an html file in ${endPath}.`);
        console.log(err);
        exit(-1);
    }
}

function configReader(config) {
    try {
        //parse the file and check for the arguments.
        const configJSON = JSON.parse(fs.readFileSync(config, 'utf8'));
        if (configJSON.lang !== "" && configJSON.lang !== undefined) {
            lang = configJSON.lang;
        }

        //validate the input for a file/folder else throws an error and close to program.
        if (fs.lstatSync(configJSON.input).isDirectory() || fs.lstatSync(configJSON.input).isFile()) {
            sourcePath = configJSON.input;
        }

        //Output folder else default to ./dist
        if (configJSON.output !== "" && configJSON.output !== undefined) {
            endPath = configJSON.output;
        }
    } catch (error) {
        console.log(`ERROR: ${error}`);
        exit(-1);
    }
}

function genCss(dir) {
    mkExist(dir);
    mkExist(`${dir}/styles.css`, false);

    try {
        fs.copyFileSync("./styles.css", `${dir}/styles.css`);
    } catch (err) {
        console.log(`Error when copying a css file to ${dir}.`);
        console.log(err);
        exit(-1);
    }
}

//TODO: Remove default path, make a config
const defaultFolder = "Sherlock Holmes Selected Stories";

module.exports = run;