//I know there are a bunch of things that can be improved on, but I don't know how exactly. I will mark those with a *

const fs = require ('fs')
const path = require('path')

let sourcePath = "./Sherlock Holmes Selected Stories/The Adventure of the Six Napoleans.txt"
let endPath = "./dist"

function readFile(file) {
  //read the file
  const fullText = String(fs.readFileSync(file, 'utf8'));

  //future functionality of choosing the element you want to use
  let element = "p";

  //divide text into paragraphs
  const paragraphs = fullText.split(/\n\n/);

  //put them all into an array
  let htmlParagraphsArray = [];
  paragraphs.forEach((paragraph) => {
    htmlParagraphsArray.push(`<${element}>${paragraph}</${element}>`);
  });

  //put them all into a single string, every paragraph starts from a new line
  texts = htmlParagraphsArray.join('\n');
  return texts;
}


//to remove all previous files
function deleteFiles (folder) {
  fs.readdir(folder, (err, files) => {
    if (err) throw err;
  
    for (const file of files) {
      fs.unlink(path.join(folder, file), err => {
        if (err) throw err;
      });
    }
  });
}

function generateFile(html) {
  fs.writeFile(`${endPath}/output.html`, html, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("web page generated");
  }); 
}

//change consts based on context. Can I take version number from package.json?
const name = "ssgnode";
const version = 0.1;
const defaultFolder = "Sherlock Holmes Selected Stories";

//check if the argument corresponds with anything we can use
let pathchanged = false;
process.argv.forEach(function (val, index, array) {
  //if path isn't the default one, change it for this next value
  if(pathchanged){
    if(!val.match("^-")) {
      //means this might be the directory
      sourcePath = val;
      console.log(`Path is now ${val}`);
    }
  }

  switch(val) {
    case "--version":
    case "-v":
      console.log(`${name}, version ${version}.`);
      break;
    case "--help":
    case "-h":
      console.log(`
      To start ${name}, run "node index.js". 
      Your generated webpage will be in ./dist.\n
      *************************************** 
      Arguments:
      Add -v or --version to check the version.
      Add -u or --input to specify a folder from which you want a webpage to be generated or a specific file you want to be turned into a webpage.
      By default the folder will be ${defaultFolder}.
      `);
      break;
    //some people have bad times/days/weeks/months/yeas/lives...
    case "--hello":
    case "-hi":
      console.log("Hi, nice person. Hope you have a nice time of the day. If not, maybe this will help ( ._.)_ <3");
      break;
    case "--input":
    case "-i":      
      pathchanged=true;
      break;
  }
});

function readFiles() {
  let texts = "";
  let html = "";
  if(fs.lstatSync(sourcePath).isDirectory()) {

    fs.readdir(sourcePath, (err, files)=> {
      if (err) {
        throw err;
      }
      files.forEach(file=>{
        console.log(file);
        //* Repeated code
        texts=readFile(`${sourcePath}/${file}`)
        html = genPage(texts);
        output(html);

      })
    })

  } else {
    //* Repeated code
    texts=readFile(sourcePath);
    html = genPage(texts);
    output(html);
    
  }
}

function output(html) {
    //if folder doesn't exist, create it
    if (!fs.existsSync(endPath)) {
      fs.mkdirSync(endPath);
    }
  
    deleteFiles(endPath);
    generateFile(html);
}

function genPage(texts) {
  const html = `
  <!DOCTYPE html>
  <html>
  <head>
  <title>Title of the document</title>
  </head>

  <body>
  ${texts}
  </body>

  </html>
  `;
  return html;
}

readFiles();


