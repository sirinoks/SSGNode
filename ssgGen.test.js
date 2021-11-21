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

    function checkGenPageArgsWithCSS(data, texts, title, stylesheet) {
        expect(typeof data).toBe("object");

        expect(typeof texts).toBe("string");
        expect(typeof title).toBe("string");
        expect(typeof stylesheet).toBe("string");

        expect(data.texts).toBe(texts);
        expect(data.title).toBe(title);
        expect(data.stylesheet).toBe(stylesheet);
    }
    let data = {
        texts: "<p>Sample text</p><p>Another paragraph</p>",
        title: "Sample stuff!",
        lang: "br",
        stylesheet: "https://cdn.jsdelivr.net/npm/water.css@2/out/water.css",
    };

    test("should be able to pass data", () => {
        checkGenPageArgs(data, data.texts, data.title, data.lang);
    });

    test("should be able to produce html with data", () => {
        const result = ssgGen.genPage(data.texts, data.title, data.lang);
        checkGenPageResult(data.texts, data.title, data.lang, result);
    });
    test("should be able to pass specified style", () => {
        expect(
            checkGenPageArgsWithCSS(
                data,
                data.texts,
                data.title,
                data.stylesheet,
            ),
        ).argv_s = `<link rel="stylesheet" type="text/css" href="please_add_your_css_path" />`;
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
        expect(() => ssgGen.readFile(null)).toThrow();
    });

    test("reading a file should not error", () => {
        const data = ssgGen.readFile(filename);
        console.log(data);
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
