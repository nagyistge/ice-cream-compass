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
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        if (/fakeCompass/.test(location.search)) initFakeCompass();
        if (screen.lockOrientation) screen.lockOrientation('portrait');
        if (navigator.geolocation) watchPosition();
        if (navigator.compass) watchHeading();
    }
};

app.initialize();

var DEBUG = false || /debug/.test(location.search);

var MILES_PER_METER = 0.000621371;

var TARGET = {
    latitude: 40.714217,
    longitude: -73.98696
};

var TARGET_LATLON = new LatLon(TARGET.latitude, TARGET.longitude);

var distance = Infinity;
var bearing = 0;

function update(id, value) {
    if (!DEBUG) return;
    document.getElementById(id).textContent = id + ': ' + value.toFixed(2);
}

function initFakeCompass() {
    if (!navigator.compass) navigator.compass = {};
    navigator.compass.watchHeading = function(success, error) {
        var deg = 0;

        window.setInterval(function() {
            deg = (deg + 1) % 360;
            success({
                magneticHeading: deg
            });
        }, 100);
    };
}

function watchHeading() {
    navigator.compass.watchHeading(function success(heading) {
        var relativeBearing = bearing - heading.magneticHeading;
        update('heading', heading.magneticHeading);
        update('relativeBearing', relativeBearing);
        document.getElementById('logo').style.transform = "rotate(" + (relativeBearing + 180) + "deg)";
    }, function error(error) {
        console.log(error);
    });
}

function watchPosition() {
    navigator.geolocation.watchPosition(function success(pos) {
        var latlon = new LatLon(pos.coords.latitude, pos.coords.longitude);

        distance = latlon.distanceTo(TARGET_LATLON) * MILES_PER_METER;
        bearing = latlon.bearingTo(TARGET_LATLON);

        document.getElementById('label').textContent = distance.toFixed(2) + ' miles';

        update('latitude', pos.coords.latitude);
        update('longitude', pos.coords.longitude);
        update('distance', distance);
        update('bearing', bearing);
    }, function error(error) {
        console.log("Error watching position", error);
    }, {
        enableHighAccuracy: true
    });
}

if (typeof(cordova) === 'undefined') {
    console.log("In browser.");
    window.addEventListener('load', app.onDeviceReady, false);
} else {
    console.log("In cordova.");
}
