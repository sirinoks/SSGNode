const ssgGen = require ("./ssgGen");
/*
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
*/

describe("genPage", ()=>{
    function checkGenPageArgs(data, texts, title, lang) {
        expect(typeof data).toBe("object");

        expect(typeof texts).toBe("string");
        expect(typeof title).toBe("string");
        expect(typeof lang).toBe("string");

        expect(data.texts).toBe(texts);
        expect(data.title).toBe(title);
        expect(data.lang).toBe(lang); 
    }

    function checkGenPageResult(data, texts, title, result) {
        expect(result).toContain(`${data}`);
        expect(result).toContain(`${texts}`);
        expect(result).toContain(`${title}`);
    }

    let data = {
        texts: "<p>Sample text</p><p>Another paragraph</p>",
        title: "Sample stuff!",
        lang: "br"
    }

    test("should be able to pass data", ()=>{
        checkGenPageArgs(data, data.texts, data.title, data.lang);
    });

    test("should be able to produce html with data", ()=>{
        const result = ssgGen.genPage(data.texts, data.title, data.lang);
        checkGenPageResult(data.texts, data.title, data.lang, result);
    });
})