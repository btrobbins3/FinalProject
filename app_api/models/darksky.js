const mongoose = require('mongoose');
var Schema = mongoose.Schema;

const weatherSchema = new Schema({
    summary: String,
    precipProbability: String,
    temperature: String,
    apparentTemperature: String,
    windSpeed: String,
    windGust: String,
});

mongoose.model('Weather', weatherSchema);