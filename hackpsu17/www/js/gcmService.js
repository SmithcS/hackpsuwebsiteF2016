// Load modules

var gcm = require('node-gcm');

if (typeof localStorage === "undefined" || localStorage === null) {
  var LocalStorage = require('node-localstorage').LocalStorage;
  localStorage = new LocalStorage('./scratch');
}

// Replace these with your own values.
var fs = require('fs');
var gcmKey = null;

fs.readFile('./gcm.key', 'utf8', function (err,data) {
        if (err) {
        	return console.log(err);
  	}
	gcmKey = data;

	console.log(gcmKey);	
	var deviceID = localStorage.getItem('registrationId');

	var service = new gcm.Sender(gcmKey);
	var message = new gcm.Message();
	message.addData('title', 'Hello, World');
	message.addData('body', 'This is a notification that will be displayed ASAP.');

	service.send(message, { registrationTokens: [ deviceID ] }, function (err, response) {
		if(err) console.error(err);
		else 	console.log(response);
	});
});

