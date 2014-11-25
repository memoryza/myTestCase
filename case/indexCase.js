
var har = require('../common/createHAR'),
	myUtils = require('../common/utils'),
	assert = require('../lib/assert'),
	address = 'http://local.m.ituxing.com/';



var totalCase = 0, successCase =0 , failCase = 0;
var response = har.initHAR(address, function(data) {
	if(data.errcode == 0) {
		
	} else {
		//console.log(data.msg)
	}
});
var caseResArr = [
	'[caseName] index',
  	'[totalCase] ' + totalCase,
  	'[successCase] ' + successCase,
    '[failCase] ' + failCase
];

exports.caseResArr = caseResArr;

