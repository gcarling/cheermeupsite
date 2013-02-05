var fs = require('fs');
var http = require('http');


function tumblrData() {
// 	http.get("http://api.embed.ly/1/oembed?url=http%3A%2F%2Fhugry.tumblr.com%2Fimage%2F42003164771&maxwidth=500",
// 		function (err, data) {
// 			if (err) {
// 				return console.log(err);
// 			}
		
// 		console.log(data);}
// 	// return "hi";
// )
	var json = createRequest();

	req.onreadystatechange = function() {
  if (req.readyState != 4) return; // Not there yet
  if (req.status != 200) {
    // Handle request failure here...
    return;
  }
  // Request successful, read the response
  var resp = req.responseText;
  // ... and use it as needed by your app.
};

req.open("GET","http://api.embed.ly/1/oembed?key=b5ecba77a307419baeb643a207e92aa2&url=http://regexpressions.tumblr.com/post/40751334960/2-53-am",
	true);

};

function createRequest() {
  var result = null;
  if (window.XMLHttpRequest) {
    // FireFox, Safari, etc.
    result = new XMLHttpRequest();
    if (typeof xmlhttp.overrideMimeType != 'undefined') {
      result.overrideMimeType('text/xml'); // Or anything else
    }
  }
  else if (window.ActiveXObject) {
    // MSIE
    result = new ActiveXObject("Microsoft.XMLHTTP");
  } 
  else {
    // No known mechanism -- consider aborting the application
  }
  return result;
}



exports.tumblrData = tumblrData;