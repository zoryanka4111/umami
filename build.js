const myExpress = require('./modules/express.js');
const getFilesFunc = require('./modules/getFilesNode.js');
const fs = require('fs');
function rnd(min, max) {
    return Math.round(min - 0.5 + Math.random() * (max - min + 1));
};
const version = rnd(1000, 9999).toString();

const renderData = {
    puthSRC: '.',
    // version: version,
    htmlPrefix: '.html',
};
console.log('Start building...');
myExpress.eachPages(renderData, 'build');
console.log('Renaming js and css files...');
// rename js and css files
// getFilesFunc.getFiles(__dirname + '/src/dist/**/*.{js.map,js,css}', function (err, res) {
//     res.forEach(element => {
//         const { extension, name, dir } = getFilesFunc.getFileData(element); // { extension, name, dir }
//         fs.rename(element, dir + name + version + extension, (err) => {
//             if (err) throw err;
//             // console.log(`${name + extension} => ${name + version + extension}`);
//         });
//     });
// });
console.log('Build is done!');