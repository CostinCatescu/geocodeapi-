const request = require('request');
const yargs = require('yargs');
const argv = yargs.options({
    a: {
        demand    :  true,
        alias     : "address",
        describe  : "Address to fetch weather app",
        string    :  true
    }})
    .help()
    .alias('help' , 'h')
    .argv;

var geocode = require('./geocode');


var geo = (adress) => {
    return new Promise((resolve, reject) => {
        geocode.geocodeAddress(adress, (errorMessage, results) => {
            if(errorMessage){
                reject(errorMessage);
            }
            else {
                resolve(results);
            }
        });
    });
};

var fore = (results) => {
    return new Promise(function(resolve, reject)  {
        geocode.forecast(results, (errorMessage, res) => {
            if (errorMessage) {
                reject(errorMessage);
            }
            else {
                resolve(JSON.stringify(res));
            }
        });
    })
};

geo(argv.a).then((res)=>{ console.log(res);
    return fore(res);
}).then((data)=>{console.log(data);
}).catch((error)=>{
    console.log(error);
});













