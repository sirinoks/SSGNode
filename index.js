const fs = require ('fs')
const path = "./Sherlock Holmes Selected Stories/The Adventure of the Six Napoleans.txt"

const fullText = String(fs.readFileSync(path, 'utf8'));

let element = "p";

const html = fullText
  .split(/\n\n/)
  .map(paragraph =>
    `<${element}>${paragraph.replace(/\r?\n/, ' ')}</${element}>`
  )
  .join(' ');

  console.log(html);