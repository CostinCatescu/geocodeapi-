"use strict"
var request = require('request');
var myownkey = "85775eb2a8571b866fe3b26988b3d";
var key = require('../config').forecastKey ||   myownkey ;


var forecast = function (latlong, callback) {
    var lat = latlong.latitude;
    var lng = latlong.longitude;
    request({ url   :`https://api.darksky.net/forecast/${key || myownkey }/${lat},${lng}`, json  : true},
        (err, res, body) => {
            if(err) callback('Unable to connect to Forecast server');
            else {
                if(!err && res.statusCode === 200){
                    callback(undefined, {temp : body.currently.temperature });
                }
                else {
                    callback('Unable to connect to Forecast server');
                }

            }
        }
    );
};

module.exports = forecast;