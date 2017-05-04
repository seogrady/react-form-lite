/* setup.js */
require('babel-register');
const JSDOM = require('jsdom').JSDOM;

const dom = new JSDOM(``);

global.document = dom.window.document;
global.window = dom.window;
Object.keys(dom.window).forEach((property) => {
  if (typeof global[property] === 'undefined') {
    global[property] = dom.window[property];
  }
});

global.navigator = {
  userAgent: 'node.js'
};