
var Debugger = function () { };
Debugger.log = function (message) {
	try {
		console.log(message);
	} catch (exception) {
		return;
	}
}


function canvasSupport () {
    //return Modernizr.canvas;
    return true;
}

