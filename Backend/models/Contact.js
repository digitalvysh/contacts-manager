const mongoose = require('mongoose');

const ContactSchema = mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users'
  },
  name: {
    type: String,
    required: true,
  },
  Designation: {
    type: String,
    required: true,
  },
  company: {
    type: String,
    required: true,
  },
  industry: {
    type: String,
    required: true,
  },

  email: {
    type: String,
    required: true,
  },
  phonenumber: {
    type: String,
    required: true,
  },
  country: {
    type: String,
    required: true,
  },

});

module.exports = mongoose.model('contact', ContactSchema);
