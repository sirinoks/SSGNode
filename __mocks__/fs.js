const fs = jest.createMockFromModule("fs");

const mockFiles = {};
function __setMockFileData(filename, data) {
    mockFiles[filename] = data;
}

function readFile(filepath) {
    const data=mockFiles[filepath];

    if(data)
        return Promise.resolve(data);
    else
        return Promise.reject(new Error("Unknown filepath"));
}

fs.promises = {
    __setMockFileData,
    readFile
};

module.exports = fs;