
function route(handlers, pathname, response, request){
	console.log("route to receive a request from " + pathname);
	if(typeof handlers[pathname] == "function"){
		return handlers[pathname](response, request);
	}else{
		console.log("no proper handler is for this url. " + pathname);
		response.writeHead(404, {"content-type": "text/plain"});
		response.write("404 not found");
		response.end();
	}
}

exports.route= route;
