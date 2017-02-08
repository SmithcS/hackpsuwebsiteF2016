
var config = {
	apiKey: "AIzaSyBFluYW_DWuVeaEzCMNFzAaHlVQnK8Qzk8",
	authDomain: "notifications-b01a3.firebaseapp.com",
	databaseURL: "https://notifications-b01a3.firebaseio.com",
	storageBucket: "notifications-b01a3.appspot.com",
	messagingSenderId: "385399873291"
};
firebase.initializeApp(config);

if (firebase) {
	console.log("Enter firebase_support.js");
	const fbmessaging = firebase.messaging();
	fbmessaging.requestPermission()
	.then(function() {
		console.log('Notification permission granted.');
		// Initialize Firebase
	})
	.catch(function(err) {
		console.log('Unable to get permission to notify.', err);
	});
	console.log("in support script");
	fbmessaging.getToken()
		.then(function(refreshedToken) {
			console.log('Token refreshed.');
			console.log(refreshedToken);
			// Indicate that the new Instance ID token has not yet been sent to the
			// app server.
			setTokenSentToServer(false);
			// Send Instance ID token to app server.
			sendTokenToServer(refreshedToken);
			// ...
		})
		.catch(function(err) {
			console.log('Unable to retrieve refreshed token ', err);
	});
	// Callback fired if Instance ID token is updated.
	fbmessaging.onTokenRefresh(function() {
		fbmessaging.getToken()
		.then(function(refreshedToken) {
			console.log('Token refreshed.');
			console.log(refreshedToken);
			// Indicate that the new Instance ID token has not yet been sent to the
			// app server.
			setTokenSentToServer(false);
			// Send Instance ID token to app server.
			sendTokenToServer(refreshedToken);
			// ...
		})
		.catch(function(err) {
			console.log('Unable to retrieve refreshed token ', err);
			showToken('Unable to retrieve refreshed token ', err);
		});
	});

	fbmessaging.onMessage(function(payload) {
		console.log("Message received. ", payload);
		var notification = new Notification(payload.notification.title, {
		      icon: '../assets/images/hackpsulogo.png',
		      body: payload.notification.body,
		});

		notification.onclick = function () {
		      window.open(payload.notification.click_action);      
		};		
	});

	function isTokenSentToServer() {
		if (window.localStorage.getItem('sentToServer') == 1) {
			return true;
		}
		return false;
	}

	function setTokenSentToServer(sent) {
		if (sent) {
			window.localStorage.setItem('sentToServer', 1);
		} else {
			window.localStorage.setItem('sentToServer', 0);
		}
	}

	function sendTokenToServer(currentToken) {
		if (!isTokenSentToServer()) {
			console.log('Sending token to server...');
			// TODO(developer): Send the current token to your server.
			setTokenSentToServer(true);
		} else {
			console.log('Token already sent to server so won\'t send it again ' +
			'unless it changes');
		}
	}
}
