module.exports = function(configFile, defaultConfig) {
    "use strict"

    const fs = require('fs');
    const objectAssign = require('object-assign-deep');
    return new Promise(function(results, reject) {
        fs.readFile(configFile, 'utf-8', function(err, config){
           if (err) {
               console.log("Can't read configuration file config.js");
               reject(err);
           } else {
               var options = objectAssign({}, defaultConfig, JSON.parse(config));
               results(options);
           }
       });
    });
}
