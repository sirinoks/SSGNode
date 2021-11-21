const ssgGen = require("./ssgGen");
jest.mock("fs");
const fs = require("fs");

describe("genPage", () => {
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
        lang: "br",
    };

    test("should be able to pass data", () => {
        checkGenPageArgs(data, data.texts, data.title, data.lang);
    });

    test("should be able to produce html with data", () => {
        const result = ssgGen.genPage(data.texts, data.title, data.lang);
        checkGenPageResult(data.texts, data.title, data.lang, result);
    });
});

describe("readFile", () => {
    const filename = "file.txt";
    const fileData = `
    I am a dragon.
    Fear me.
    HAHAHA
    `;
    //set up the mock file system
    beforeAll(() => {
        fs.__setMockFileData(filename, fileData);
    });

    test("wrong path should throw", () => {
        expect(() => ssgGen.readFile(null)).toThrow();
    });
});

describe("pageGenerator", () => {
    const contentArray = {
        texts: `<p>This is one paragraph.</p>
        <p>This is another.</p>`,
        title: `I am a title!`,
    };

    test("should be able to generate a normal page", () => {
        ssgGen.pageGenerator(contentArray, "br");
    });

    test("should throw from bad data", () => {
        expect(() => ssgGen.pageGenerator(null, "br")).toThrow();
    });
});
