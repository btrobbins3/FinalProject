const request = require('request');
const use_this_port = process.env.PORT || '3000';
const apiOptions = {
  server: 'http://localhost:' + use_this_port
};

const axios = require('axios');
require('dotenv').config();
const mongoose = require('mongoose');
var Schema = mongoose.Schema;

require('../../app_api/models/darksky');
const Weather = mongoose.model('Weather');

const Airports = [
  "KLAX",
  "KDEN",
  "KATL",
  "KORD",
  "KDFW",
  "KJFK",
  "KSFO",
  "KLAS"
];


const AirportCoordinates = [
  {
      Airport: "KLAX",
      Longitude:33.9416,
      Latitude:118.4085,
  },
  {
      Airport: "KDEN",
      Longitude:39.8561,
      Latitude:104.6737,
  },
  {
      Airport: "KATL",
      Longitude:33.6407,
      Latitude:84.4277,
  },
  {
      Airport: "KORD",
      Longitude:33.9416,
      Latitude:118.4085,
  },
  {
      Airport: "KDFW",
      Longitude:32.8998,
      Latitude:97.0403,
  },
  {
      Airport: "KJFK",
      Longitude:40.6413,
      Latitude:73.7781,
  },
  {
      Airport: "KSFO",
      Longitude:37.6213,
      Latitude:118.4085,
  },
  {
      Airport: "KLAS",
      Longitude:33.9416,
      Latitude:122.3790,
  }
];

let selectedAirport = "KLAX";


const writeWeatherModelListToPersist = (weather_list) => {

  const uri = process.env.MONGODB_ATLAS_WEATHER;

  mongoose.connect(uri, {useNewUrlParser: true, useUnifiedTopology: true})
          .catch(err => console.log(err));

  var promise = Weather.create(weather_list[0], (err, docs) => {
      if(!err){
          console.log(`INSERTED: ${weather_list.length} records from DarkSky`);
      }else{
          console.log(err);
      }
  });
}

const createWeatherModel = (weather) => {
  return {
      summary: weather.data.currently.summary,
      precipProbability: weather.data.currently.precipProbability, 
      temperature: weather.data.currently.temperature, 
      apparentTemperature: weather.data.currently.apparentTemperature,
      windSpeed: weather.data.currently.windSpeed, 
      windGust: weather.data.currently.windGust,
  }
};


const parseDarksky = (response) => {

  var weatherModelList = [];

  weatherModelList.push(createWeatherModel(response));

  console.log("WRITING TO DB " + new Date().toTimeString());    
  writeWeatherModelListToPersist(weatherModelList);
      
};

const vatsimAirportSelection = (req, res) => {
    console.log(req.body);
    selectedAirport = req.body.selectedAirport;
    console.log(`Selected Airport: ${selectedAirport}`);
    vatsimArrivals(req, res);
}

const vatsimArrivals = (req, res) => {
    // /arrived/:airport/:howMany/:offset
    const result = AirportCoordinates.find( ({ Airport }) => Airport === selectedAirport );
    console.log(`Latitude and Longitude: ${result.Longitude},-${result.Latitude}`);
    axios.get(`https://api.darksky.net/forecast/1e27aa19a94898be398accadc6d78643/${result.Longitude},-${result.Latitude}?exclude=minutely,hourly,daily,alerts,flags`)
    .then( (response) => {
        parseDarksky(response);
    })
    .catch( (error) => {
        console.log(error);
    });
    console.log(`Selected Airport: ${selectedAirport}`);
    const path = `/api/arrived/${selectedAirport}`;
    const requestOptions = {
      url: `${apiOptions.server}${path}`,
      method: 'GET',
      json: {},
    };
    request(
      requestOptions,
      (err, {statusCode}, body) => {
        let data = [];
        if (statusCode === 200 && body.length) {
            data = body;
        }
        renderArrivalsPage(req, res, data);
      },
    );
};


      // wrequestOptions,
      // (err, {statusCode}, body) => {
      //   let wdata = [];
      //   if (statusCode === 200 && body.length) {
      //       wdata = body;
      //   }
      //   renderArrivalsPage(req, res, data, wdata);
      // }
      // const wpath = `/api/weather/${selectedAirport}`;
      // const wrequestOptions = {
      //   url: `${apiOptions.server}${wpath}`,
      //   method: 'GET',
      //   json: {},
      // };
      // request(
      //   wrequestOptions,
      //   (err, {statusCode}, body) => {
      //     let wdata = [];
      //     if (statusCode === 200 && body.length) {
      //         wdata = body;
      //     }
      //     renderArrivalsPage(req, res, data, wdata);
      //   }
      // );
  
const renderArrivalsPage = (req, res, responseBody) => {
    let message = null;
    if (!(responseBody instanceof Array)) {
      message = 'API lookup error';
      responseBody = [];
    } else {
      if (!responseBody.length) {
        message = 'No results for this airport';
      }
    }
    res.render('arrivals', 
        {
            airports: Airports,
            clients: responseBody,
            message,
            selectedAirport
        }
    );
};

  module.exports = {
    vatsimArrivals,
    vatsimAirportSelection
  };