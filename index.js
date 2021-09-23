const fs = require ('fs')
const path = require('path')
const { name, version } = require('../SSGNode/package.json')

let sourcePath = "./Sherlock Holmes Selected Stories/The Adventure of the Six Napoleans.txt"
let endPath = "./dist"

function readFile(file) {
  if(file.match(".*(\.txt|\.md)$")){
  //read the file
  let fullText = fs.readFileSync(file, 'utf8');
    //condition to check if file has extension of md.
    if(file.match(".*(\.md)$")){
      //replacing the strings globally according to features.
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
    }
  //future functionality of choosing the element you want to use
  let element = "p";

  //divide text into paragraphs
  const paragraphs = fullText.split(/\r?\n\r?\n/);

  let title = paragraphs[0];
  let htmlParagraphsArray = [];

  //put them all into an array
  for (let i=0;i<paragraphs.length;i++){
    if (i==0)//only the first paragraph is the title
      htmlParagraphsArray.push(`<h1>${title}</h1>`);
    else {
      htmlParagraphsArray.push(`<${element}>${paragraphs[i]}</${element}>`);
    }
  }

  //put them all into a single string, every paragraph starts from a new line
  texts = htmlParagraphsArray.join('\n');
  return {"texts": texts, "title": title};
}
}

//to remove all previous files
function deleteFiles (folder) {
  fs.readdirSync(folder, (err, files) => {
    if (err) throw err;
  
    for (const file of files) {
      fs.unlinkSync(path.join(folder, file), err => {
        if (err) throw err;
      });
    }
  });
}

function generateFile(html) {
  fs.writeFileSync(`${endPath}/output.html`, html, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("web page generated");
  }); 
}

//change consts based on context. Can I take version number from package.json?
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

function pageGenerator(contentArray) {
    html = genPage(contentArray["texts"], contentArray["title"]);
    output(html);
}

function finalize() {
  let texts = "";
  let title = "";
  let html = "";
  if(fs.lstatSync(sourcePath).isDirectory()) {

    fs.readdir(sourcePath, (err, files)=> {
      if (err) {
        throw err;
      }
      files.forEach(function(file){
        if(file.match(".*(\.txt|\.md)$")){
          console.log(file);
          console.log("File mathched:");
          console.log(file);
          let contentArray = readFile(`${sourcePath}/${file}`)
          pageGenerator(contentArray)
        }
      })
    })

  } else {
    let contentArray = readFile(sourcePath);
    pageGenerator(contentArray)
  }
  console.log("Website generated");
}

function output(html) {
    //if folder doesn't exist, create it
    if (!fs.existsSync(endPath)) {
      fs.mkdirSync(endPath);
    }
    deleteFiles(endPath);
    generateFile(html);
    genCss(endPath);
}

function genCss(dir) {
  fs.copyFileSync("styles.css", `${dir}/styles.css`, (err)=>{
    if (err) throw err;
  })
}

function genPage(texts, title) {
  const html = `
  <!DOCTYPE html>
  <html>
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

finalize();


