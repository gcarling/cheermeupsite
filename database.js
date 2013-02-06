var mongodb = require('mongodb');
var url = require('url');
var mailer = require('./mail')
var requestMod = require("request");

log = console.log;

function addDB(time, yourName, yourMessage, yourEmail, theirEmail, theirName) {
	console.log("logDB called!");
	var now = new Date();
	var connectionUri = url.parse("mongodb://GabeLyons:happynotsad@widmore.mongohq.com:10010/CheerMeUp");
	var dbName = connectionUri.pathname.replace(/^\//, '');
	mongodb.Db.connect("mongodb://GabeLyons:happynotsad@widmore.mongohq.com:10010/CheerMeUp", function(error, client) {
	  if (error) throw error;
	  var collection = new mongodb.Collection(client, "emails");
	  var currentDate = (parseInt(now.getUTCMonth()) + 1) + "/" + now.getUTCDate() + "/" + now.getUTCFullYear();
	  collection.save({'email' : theirEmail, 'yourEmail' : yourEmail, 'time' : time, 'yourName' : yourName, 'yourMessage' : yourMessage, 'theirName' : theirName, 'genTime' :  currentDate});
	});
}

function checkDB(time) {
	var connectionUri = url.parse("mongodb://GabeLyons:happynotsad@widmore.mongohq.com:10010/CheerMeUp");
	var dbName = connectionUri.pathname.replace(/^\//, '');
	mongodb.Db.connect("mongodb://GabeLyons:happynotsad@widmore.mongohq.com:10010/CheerMeUp", function(error, client) {
	  if (error) throw error;
	  var collection = new mongodb.Collection(client, "emails");

	  var myCursor = collection.find({'time' : time.getUTCHours() + "-" + time.getUTCDate() + "-" + time.getUTCMonth() + "-" + time.getUTCFullYear()});
      myCursor.toArray(function(error, docs) {
        if(error) throw error;
        docs.forEach(function(doc){
	        requestMod('http://peddler.co/form/scrape', function (error, response, body) {
			  if (!error && response.statusCode == 200) {
		          mailer.sendMail(doc.email, doc.yourEmail, doc.yourName, doc.theirName, doc.yourMessage, body, doc.genTime);
		          
		        }
			});
		});
		collection.remove({'time' : time.getUTCHours() + "-" + time.getUTCDate() + "-" + time.getUTCMonth() + "-" + time.getUTCFullYear()});
      });
	});
}

exports.addDB = addDB;
exports.checkDB = checkDB;