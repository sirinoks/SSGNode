const fs = require ('fs')
const path = "./Sherlock Holmes Selected Stories/The Adventure of the Six Napoleans.txt"
//read the file
const fullText = String(fs.readFileSync(path, 'utf8'));

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
const html = htmlParagraphsArray.join('\n');

//output
console.log(html);

//change consts based on context. Can I take version number from package.json?
const name = "ssgnode";
const version = 0.1;
const defaultFolder = "Sherlock Holmes Selected Stories";

//check if the argument corresponds with anything we can use
process.argv.forEach(function (val, index, array) {
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
  }

});