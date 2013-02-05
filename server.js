var server = require("./realServer");
var router = require("./router");
var requestHandlers = require("./requestHandlers");

var db = require("./database");

var handle = {}
handle[""] = requestHandlers.index;
handle["/"] = requestHandlers.index;
handle["/index"] = requestHandlers.index;
handle["/vinh"] = requestHandlers.vinh;
handle["/dooman"] = requestHandlers.dooman;
handle["/newCheer"] = requestHandlers.newCheer;

setInterval(function() {

	var now = new Date();
	db.checkDB(now);
}, 1000);


server.start(router.route, handle);