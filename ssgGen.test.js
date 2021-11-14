const ssgGen = require ("./ssgGen");

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

