const mongoose = require('mongoose')

const subscriberSchema = new mongoose.Schema({
  identification: {
    type: String,
    // required: true
  },
  name: {
    type: String,
    // required: true
  },
  start_date: {
    type: String,
    // required: true
  },
  start_hour: {
    type: String,
    // required: true
  },
  end_date: {
    type: String,
    // required: true
  },
  end_hour: {
    type: String,
    // required: true
  },
  extra_start_hour: {
    type: String,
    // required: true
  },
  extra_end_hour: {
    type: String,
    // required: true
  },
  
  reason: {
    type: String,
    // required: true
  },

})
//     identification: "123123"
// name: "jose "
// start_date: Sat Mar 07 2020 00:00:00 GMT-0500 (hora estándar de Colombia) {}
// start_hour: "11:11"
// end_date: Sun Mar 01 2020 00:00:00 GMT-0500 (hora estándar de Colombia) {}
// end_hour: "22:02"
// extra_start_hour: "03:03"
// extra_end_hour: "04:05"
// reason: "jose"

module.exports = mongoose.model('Subscriber', subscriberSchema)