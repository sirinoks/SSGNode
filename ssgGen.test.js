const { run, genPage, readFile } = require("./ssgGen");
jest.mock("fs");
const fs = require("fs").promises;

console.log(run);

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
        const result = genPage(data.texts, data.title, data.lang);
        checkGenPageResult(data.texts, data.title, data.lang, result);
    });
});

describe("readFile", () => {
    const filename = "file";
    const fileData = "<p>I am a dragon</p><p>Fear me.</p>";
    //set up the mock file system
    beforeAll(() => {
        fs.__setMockFileData(filename, fileData);
    });

    test("wrong path should throw", () => {
        expect(() => readFile(null)).toThrow();
    });

    test("reading a file should not error", () => {
        const data = readFile(filename);
        console.log(data);
        expect(data).toEqual(fileData);
    });
});
