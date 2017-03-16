"use strict"

var request = require('request');

var geocodeAdress = function (adress, callback) {

    var encodedadress = encodeURIComponent(adress);

    request({ url   :`http://maps.googleapis.com/maps/api/geocode/json?address=${encodedadress}`, json  : true},

        (err, res, body) => {
            if(err) callback('Unable to connect to Google server');
            else {
                switch (body.status) {
                    case "OK":
                        callback(undefined, {
                            address   : body.results[0].formatted_address,
                            latitude  : body.results[0].geometry.location.lat,
                            longitude : body.results[0].geometry.location.lng
                        });
                        break;
                    case "INVALID_REQUEST" :
                        callback('Specifica o adresa');
                        break;
                    case "ZERO_RESULTS" :
                        callback('Nici un rezultat, specifica o alta adresa ');
                        break;
                }
            }
        }
    );
};

module.exports = geocodeAdress;