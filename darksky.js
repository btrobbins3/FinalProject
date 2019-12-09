// const cron = require('node-cron');
// const axios = require('axios');
// require('dotenv').config();
// const mongoose = require('mongoose');
// var Schema = mongoose.Schema;

// require('./app_api/models/darksky');
// const Weather = mongoose.model('Weather');


// const AirportCoordinates = [
//     {
//         Airport: "KLAX",
//         Longitude:33.9416,
//         Latitude:118.4085,
//     },
//     {
//         Airport: "KDEN",
//         Longitude:39.8561,
//         Latitude:104.6737,
//     },
//     {
//         Airport: "KATL",
//         Longitude:33.6407,
//         Latitude:84.4277,
//     },
//     {
//         Airport: "KORD",
//         Longitude:33.9416,
//         Latitude:118.4085,
//     },
//     {
//         Airport: "KDFW",
//         Longitude:32.8998,
//         Latitude:97.0403,
//     },
//     {
//         Airport: "KJFK",
//         Longitude:40.6413,
//         Latitude:73.7781,
//     },
//     {
//         Airport: "KSFO",
//         Longitude:37.6213,
//         Latitude:118.4085,
//     },
//     {
//         Airport: "KLAS",
//         Longitude:33.9416,
//         Latitude:122.3790,
//     }
// ];

// const writeWeatherModelListToPersist = (weather_list) => {

//     const uri = process.env.MONGODB_ATLAS_WEATHER;

//     mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
//             .catch(err => console.log(err));

//     var promise = Weather.create(weather_list[0], (err, docs) => {
//         if(!err){
//             console.log(`INSERTED: ${weather_list.length} records from DarkSky`);
//         }else{
//             console.log(err);
//         }
//     });
// }

// const createWeatherModel = (weather) => {
//     return {
//         // latitude: weather.data.latitude,
//         // longitude: weather.data.longitude, 
//         // timezone: weather.data.timezone,
//         // time: weather.data.time,
//         summary: weather.data.currently.summary, 
//         // icon: weather.data.currently.icon, 
//         // nearestStormDistance: weather.data.currently.nearestStormDistance,
//         precipProbability: weather.data.currently.precipProbability, 
//         temperature: weather.data.currently.temperature, 
//         apparentTemperature: weather.data.currently.apparentTemperature,
//         // humidity: weather.data.currently.humidity, 
//         // pressure: weather.data.currently.pressure, 
//         windSpeed: weather.data.currently.windSpeed, 
//         windGust: weather.data.currently.windGust,
//     }
// };

// const parseDarksky = (response) => {

//     var weatherModelList = [];

//     weatherModelList.push(createWeatherModel(response));

//     console.log("WRITING TO DB " + new Date().toTimeString());    
//     writeWeatherModelListToPersist(weatherModelList);
        
// };

// let selectedAirport = "KLAX";

// const weatherCall = (req, res) => {
//     console.log(`Dark Sky Airport 1: ${req.body.selectedAirport}`);
//     selectedAirport = req.body.selectedAirport;
//     console.log(`DARKSKY AIRPORT 1: ${selectedAirport}`);
//     // const result = AirportCoordinates.find( ({ Airport }) => Airport === selectedAirport );
//     // console.log(`Selected Airport: ${airportForWeather}`);
//     weatherAPI(req, res);
// }



// const weatherAPI = (req, res) => {
//     // /arrived/:airport/:howMany/:offset
//     console.log(`DARKSKY AIRPORT: ${selectedAirport}`);
    
// };


// //     axios.get('https://api.darksky.net/forecast/1e27aa19a94898be398accadc6d78643/' + {result.Longitude} + ',-' + {result.Latitude} + '?exclude=minutely,hourly,daily,alerts,flags')
// //     .then( (response) => {
// //         parseDarksky(response);
// //     })
// //     .catch( (error) => {
// //         console.log(error);
// //     });
// // }

// const task = cron.schedule('*/20 * * * *', () => {
//     // axios.get('https://api.darksky.net/forecast/1e27aa19a94898be398accadc6d78643/' + {Longitude} + ',-' + {Latitude} + '?exclude=minutely,hourly,daily,alerts,flags')
//     axios.get('https://api.darksky.net/forecast/1e27aa19a94898be398accadc6d78643/33.9416,-118.4085?exclude=minutely,hourly,daily,alerts,flags')
//      .then( (response) => {
//         parseDarksky(response);
//      })
//      .catch( (error) => {
//          console.log(error);
//      });
 
//      },{
//          scheduled: false
//      }
//  );

// module.exports = weatherCall;