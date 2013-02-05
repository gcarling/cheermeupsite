
var fs = require("fs");
var exec = require("child_process").exec;
var querystring = require("querystring");
var formidable = require("formidable");
var mailer = require('./mail')
var requestMod = require("request");

var db = require("./database");
var vinhCode = require("./TumblrScrape");
var doomanCode = require("./RedditScrape");

var http = require('http');

// called when the server requests "/" or ""
function index(response, request) {
	console.log("Request handler 'index' was called");
	// reads the index.html file and prints it out
	fs.readFile("./index.html", function(err, data){
		if(err) throw err;
		response.writeHead(200, {"Content-Type": "text/html"});
		response.write(data);
		response.end();
	});
}

function vinh(response, request) {
	console.log("Request for VINH");
	response.writeHead(200, {"Content-Type": "text/html"});
	requestMod('http://peddler.co/form/scrape', function (error, Altresponse, body) {
		  if (!error && Altresponse.statusCode == 200) {
				response.write(mailer.bodyGenerator("Gabe", "Vinh", "Gabe, please respond", body));
				response.end();
		  } else {
			response.write("error");
			response.end();
		  }
	});
}

function dooman(response, request) {
	var result = doomanCode.redditData();
	response.writeHead(200, {"Content-Type" : "test/html"});
	response.write("hi");
	response.end();
}

function newCheer(response, request) {
	console.log("throwing a new cheer up")
	if (request.method == 'POST') {
        var body = '';
        request.on('data', function (data) {
            body += data;
        });
        request.on('end', function () {
            var POST = querystring.parse(body);

            var address = POST["email"];


            var yourAddress = POST["senderemail"];


			var date = POST["date"];
			dateArr = date.split("/");


			var hour = parseInt(POST["hour"]);

			var ampm = POST["AMPM"];
			var timeZone = POST["timeZone"];

			if(hour == "12") hour = "0";
			if(ampm == "PM") {
				hour = parseInt(hour) + 12;
			}

			hour = parseInt(hour) + (parseInt(timeZone)/(60));


			if(parseInt(hour) >= 24) {

				hour = parseInt(hour) - 24;
				dateArr[1] = parseInt(dateArr[1]) + 1;
			}


			aggDate = hour + "-" + parseInt(dateArr[1]) + "-" + (parseInt(dateArr[0])-1) + "-" + parseInt(dateArr[2]);

			var yourMessage = POST["message"];

			var yourName = POST["sender"];

			var theirName = POST["receiver"];

			db.addDB(aggDate, yourName, yourMessage, yourAddress, address, theirName);
			response.writeHead(200, { 'Content-Type': 'application/json' });
			response.write(JSON.stringify({ 'status': 'success' }));
			response.end();
        });
    }
}



exports.index = index;
exports.vinh = vinh;
exports.dooman = dooman;
exports.newCheer = newCheer;