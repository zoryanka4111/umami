const myExpress = require('./modules/express.js');
const config = require('./modules/config.js');

const renderData = {
  puthSRC: '.',
  version: '',
  htmlPrefix: '',
};

myExpress.eachPages({...renderData, ...config.settings}, 'server');

myExpress.app.listen(3000);
console.log('Server started on', 'http://localhost:3000');