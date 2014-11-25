var fs = require('fs');
fs.changeWorkingDirectory(phantom.libraryPath);
var writeLog = require('./common/writelog');
var Log = writeLog.getInstance();
var system = require('system');
var needConsole =  false;
if(system.args.length > 1) {
    var commands = system.args.slice(1);
    //command list
    for(var i = 0, _len = commands.length; i < _len; i++) {
        switch(commands[i]) {
            case  '-c':
                needConsole = true;
                break;
        }
    }
}
try {
    var scanDirectory = function (path) {
        if (fs.exists(path) && fs.isFile(path)) {
            var modIdex = path.lastIndexOf('.js');
            if(modIdex > 0) {
                var caseArr = require(path).caseResArr;
                for(var i = 0, _len = caseArr.length; i < _len; i++) {
                    Log.write(caseArr[i]);
                    if(needConsole) {
                        console.log(caseArr[i] + '\n');
                    }
                }
               
            }
        } else if (fs.isDirectory(path)) {
            fs.list(path).forEach(function (e) {
                if ( e !== "." && e !== ".." ) {    //< Avoid loops
                    scanDirectory(path + '/' + e);
                }
            });
        }
    };
    scanDirectory('./case');
    Log.end();
} catch(e) {
    console.log(e);
}
phantom.exit();