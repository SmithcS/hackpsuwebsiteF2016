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
	app.push = PushNotification.init({
	     	"android": {
		 	"senderID": "838368032544"
	     	},
	     	"ios": {
	       		"sound": true,
	       		"vibration": true,
	       		"badge": true
	     	},
		"windows": {}
	});

	app.push.on('registration', function(data) {
	     	console.log("registration event: " + data.registrationId);
	     	document.getElementById("regId").innerHTML = data.registrationId;
	     	var oldRegId = localStorage.getItem('registrationId');
	     	if (oldRegId !== data.registrationId) {
	 		// Save new registration ID
	 		localStorage.setItem('registrationId', data.registrationId);
			// Post registrationId to your app server as the value has changed
 		}
	});

 	app.push.on('error', function(e) {
	     	console.log("push error = " + e.message);
	});

	app.push.on('notification', function(data) {
		console.log("notification received";
		console.log("data" + data.message);		
		console.log("addtional data" + data.additionalData.foreground);
	});
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
