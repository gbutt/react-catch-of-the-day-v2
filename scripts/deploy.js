var fs = require('fs-extra');
var path = require('path');

var deployConfig = require('../config/deploy.config');

if (!deployConfig.deployPath) {
    console.error('no deploy path specified');
    pocess.exit(1);
}

fs.removeSync(deployConfig.deployPath);
fs.ensureDirSync(deployConfig.deployPath);
fs.copySync('./build', deployConfig.deployPath);
console.log('done');
// .then(() => {fs.ensureDir(deployConfig.deployPath)})
// .then(() => {fs.copy('./build', deployConfig.deployPath)})
// .then(() => {console.log('done')});
// fs.copySync('../build', deployConfig.deployPath)