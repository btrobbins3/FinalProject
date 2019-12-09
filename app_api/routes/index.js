const express = require('express');
const router = express.Router();
const ctrlVatsim = require('../controllers/vatsim');

router
  //based on https://flightaware.com/commercial/flightxml/explorer/#op_Arrived  
  .route('/arrived/:airport')
  .get(ctrlVatsim.arrived);

// router
//   //based on https://flightaware.com/commercial/flightxml/explorer/#op_Arrived  
//   .route('/weather/:airport')
//   .get(ctrlVatsim.weather);

module.exports = router;