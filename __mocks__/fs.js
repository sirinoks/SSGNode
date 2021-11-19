const fs = jest.createMockFromModule("fs");

const mockFiles = {};
function __setMockFileData(file, data) {
    mockFiles[file] = data;
}

function readMock(filepath) {
    return mockFiles[filepath] || [];
}

fs.__setMockFileData = __setMockFileData;
fs.readMock = readMock;

module.exports = fs;
