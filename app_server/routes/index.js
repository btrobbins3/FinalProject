var express = require('express');
var router = express.Router();
const ctrlVatsim = require('../controllers/vatsim');

/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(process.env.PORT);
  res.render('index', { title: 'Weather for Major Airports' });
});

/* doing arrivals the server-side (Express and Pug) way */
router.get('/arrivals', ctrlVatsim.vatsimArrivals);
router.post('/arrivals', ctrlVatsim.vatsimAirportSelection);

module.exports = router;
