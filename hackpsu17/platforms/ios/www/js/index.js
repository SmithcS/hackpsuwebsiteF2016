/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */



var app = {
    // Application Constructor
    initialize: function() {
        document.addEventListener('deviceready', this.onDeviceReady.bind(this), false);
    },

    // deviceready Event Handler
    //
    // Bind any cordova events here. Common events are:
    // 'pause', 'resume', etc.
    onDeviceReady: function() {
        this.receivedEvent('deviceready');
	console.log("device ready");	
	if (device.platform != "browser") {	
		$.support.cors = true;
		FCMPlugin.onTokenRefresh(function(token){
			console.log( token );
			var messageObj = {
				"_id": token,
				"platform": device.platform
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
		});

		FCMPlugin.getToken(function(token){
			console.log( token );
			var messageObj = {
				"_id": token,
				"platform": device.platform
			};
			console.log("messageObj: " + JSON.stringify(messageObj));
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
					"Access-Control-Allow-Headers": "Authorization, X-Requested-With, origin, content-type",
					"Content-Type": "application/json"
				}
			});    
		});
		
		FCMPlugin.onNotification(function(data){
			if(data.wasTapped){
				//Notification was received on device tray and tapped by the user.
				console.log( JSON.stringify(data) );
			}else{
				//Notification was received in foreground. Maybe the user needs to be notified.
				console.log( JSON.stringify(data) );
			}
		}, function(success) {
			console.log(JSON.stringify(success));
		}, function(err) {
			console.log(JSON.stringify(err));
		});
	}
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');

        console.log('Received Event: ' + id);
    }
};

app.initialize();
