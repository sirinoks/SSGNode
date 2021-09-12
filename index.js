const fs = require ('fs')
const path = "/Sherlock Holmes Selected Stories/test.txt"

fs.readdirSync(path);

const html = fullText
  .split(/\r?\n\r?\n/)
  .map(para =>
    `<p>${para.replace(/\r?\n/, ' ')}</p>`
  )
  .join(' ');