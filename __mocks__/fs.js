const fs = jest.createMockFromModule("fs");

const mockFiles = {};
function __setMockFileData(filename, data) {
    mockFiles[filename] = data;
}

function readMock(filepath) {
    const data = mockFiles[filepath];

    if (data) return Promise.resolve(data);
    else return Promise.reject(new Error("Unknown filepath"));
}

fs.promises = {
    __setMockFileData,
    readMock,
};

module.exports = fs;
