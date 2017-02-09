
var config = {
	apiKey: "AIzaSyBFluYW_DWuVeaEzCMNFzAaHlVQnK8Qzk8",
	authDomain: "notifications-b01a3.firebaseapp.com",
	databaseURL: "https://notifications-b01a3.firebaseio.com",
	storageBucket: "notifications-b01a3.appspot.com",
	messagingSenderId: "385399873291"
};
firebase.initializeApp(config);

if (firebase) {
	const fbmessaging = firebase.messaging();
	fbmessaging.requestPermission()
	.then(function() {
		console.log('Notification permission granted.');
		fbmessaging.getToken(true)
		.then(function(token) {
			console.log(token);
			if (token != null) {
				var messageObj = {
					"_id": token,
					"platform": "browser" 
				};				
		
				$.ajax({
					type: "POST",
					url: "https://api.mlab.com/api/1/databases/push-notification-registrations/collections/registrations?apiKey=Y9MYB5bt3fAyPmJ99eXfiRIJGZK9N-hz",
					data: JSON.stringify(messageObj),
					success: function(result){
						console.log(JSON.stringify(result));
					},
					error: function(err) {
						console.log(JSON.stringify(err));
					},
					headers: {
						"Access-Control-Allow-Origin": "*",
						"Access-Control-Allow-Methods": "GET, POST",
						"Access-Control-Allow-Headers": "Authorization",
						"Content-Type": "application/json"
					}
				});	
			}
		})
		.catch(function(err) {
			console.log('Unable to retrieve token ', err);
		});

		fbmessaging.onTokenRefresh(function() {
			fbmessaging.getToken()
			.then(function(refreshedToken) {
				console.log('Token refreshed.');
				console.log(refreshedToken);
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
	})
	.catch(function(err) {
		console.log('Unable to get permission to notify.', err);
	});
	
}

