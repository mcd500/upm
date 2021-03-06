/*jslint node:true, vars:true, bitwise:true, unparam:true */
/*jshint unused:true */
/*
* Author: Ron Evans (@deadprogram)
* Copyright (c) 2016 Intel Corporation.
*
* Permission is hereby granted, free of charge, to any person obtaining
* a copy of this software and associated documentation files (the
* "Software"), to deal in the Software without restriction, including
* without limitation the rights to use, copy, modify, merge, publish,
* distribute, sublicense, and/or sell copies of the Software, and to
* permit persons to whom the Software is furnished to do so, subject to
* the following conditions:
*
* The above copyright notice and this permission notice shall be
* included in all copies or substantial portions of the Software.
*
* THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
* EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF
* MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
* NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE
* LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION
* OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION
* WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
*/

var mraa = require('mraa');
console.log('MRAA Version: ' + mraa.getVersion());

// open connection to Firmata
mraa.addSubplatform(mraa.GENERIC_FIRMATA, "/dev/ttyACM0");

var curieImu = require('jsupm_curieimu');
var myCurie = new curieImu.CurieImu();

var outputStr;
var myInterval = setInterval(function()
{
	myCurie.updateAccel();
	outputStr = "accel: x " + myCurie.getAccelX()
				+ " - y " + myCurie.getAccelY()
				+ " - z " + myCurie.getAccelZ();
	console.log(outputStr);
}, 500);

// Print message when exiting
process.on('SIGINT', function()
{
	clearInterval(myInterval);
	console.log("Exiting");
	process.exit(0);
});
