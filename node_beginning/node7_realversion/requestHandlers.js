var exec = require("child_process").exec;
var querystring = require("querystring"),
	fs = require("fs"),
	formidable=require("formidable");

function start(response, request){
	console.log("Request handler 'start' is called. ");

	var body = '<html>'+
'<head>'+
'<meta http-equiv="Content-Type" content="text/html; '+
'charset=UTF-8" />'+
'</head>'+
'<body>'+
'<form action="/upload" enctype="multipart/form-data" ' +
'method="post"> '+
'<input type="file" name="upload">'+ 
'<input type="submit" value="Upload file" />'+
'</form>'+
'</body>'+
'</html>';
response.writeHead(200, {"Content-Type": "text/html"});
response.write(body);
response.end();

}

function upload(response, request){
	console.log("go to upload handler");

	var form = new formidable.IncomingForm();
	console.log("about to parse");

	form.parse(request, function(error, fields, files){
		console.log("parsing done");
		fs.renameSync(files.upload.path, "..//test.png");
		// response.writeHead(200, {"Content-type":"text/plain"});
		//难道是这里 plain 应该是 html 
		response.writeHead(200, {"Content-type":"text/html"});

		response.write("received image: <br/>");
		response.write("<img src='/show' />");  //Note here route
		response.end();
	});

	// var form = new formidable.IncomingForm(); 
	// console.log("about to parse"); 
	// form.parse(request, function(error, fields, files) {
	//  	console.log("parsing done"); 
	//  	fs.renameSync(files.upload.path, "..//test.png"); 
	//  	response.writeHead(200, {"Content-Type": "text/html"}); 
	//  	response.write("received image:<br/>");
	// 	response.write("<img src='/show' />"); 
	// 	response.end(); 
	// });
}

function show(response){

	console.log("go to show");
	fs.readFile("..//test.png", "binary", function(error, file){
		if(error){
			console.log("show error");
			response.writeHead(500, {"Content-type":"text/plain"});
			response.write(error + "\n");
			response.end();
		} else{
			console.log("show not error");

			response.writeHead(200, {"Content-Type": "image/png"}); 
			response.write(file, "binary"); 
			response.end();
		}
	});
}

exports.start = start;
exports.upload = upload;
exports.show = show;
