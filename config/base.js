var path = require('path');
var rootDir = path.resolve(__dirname, '../');
var srcDir = path.join(rootDir, 'src');
var distDir = path.join(rootDir, 'dist');
var docDir = path.join(rootDir, 'doc');

module.exports = {
    rootDir,
    srcDir,
    distDir,
    docDir,
    pathJoin(filePath) {
        return path.join(rootDir, filePath);
    }
};