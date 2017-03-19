
var server = require("./server");
//this is to invoke the server.js.
var router = require("./router"); 
var requestHandlers = require("./requestHandlers");

var handlers = {};
handlers["/"] = requestHandlers.start;
handlers["/start"] = requestHandlers.start;
handlers["/upload"] = requestHandlers.upload;
handlers["/show"] = requestHandlers.show;

server.start(router.route, handlers);

// firstly, invoke the filename  requestHandlers. 
// secondly, handlers is initiated. 
// thirdly, use it as input paramters. 
