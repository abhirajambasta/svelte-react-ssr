const path = require('path');
const rimraf = require('rimraf');

// client
const clientConfig = require("./webpack/client"); 
// server
const serverConfig = require("./webpack/server"); 

// Clean folders
rimraf.sync(path.join(__dirname, 'dist'));

module.exports = [serverConfig, clientConfig];