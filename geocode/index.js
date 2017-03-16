module.exports =
    {
        geocodeAddress : (adress, callback) =>  require('./geocode')(adress, callback),
        forecast : (latlong, callback) => require('./forecastio')(latlong, callback)

    };
