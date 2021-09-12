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

//old suggested version
/*
const html = fullText
  .split(/\n\n/)
  .map(paragraph =>
    `<${element}>${paragraph.replace(/\r?\n/, ' ')}</${element}>`
  )
  .join(' ');

*/

//output
console.log(html);
