const mongoose = require('mongoose');
const Joi = require('joi');

const itinerarySchema =  new mongoose.Schema({
    name: {
        type: String,
        required: true,
      },

    dates: {
        type: Date,
        required: true,
    },

    destinations: {
        type: String,
        required: true,
    },

    activities:{
        type: String,
        required: true,
    },

    transportation_details: {
        type: String,
        required: true,
    },

    accommodation_details: {
        type: String,
        required: true,
    },

    created_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },

    updated_by: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    }

});

const validateItinerary = itinerary => {
    const schema = Joi.object({
    name: Joi.string(),
    dates: Joi.date(),
    destinations: Joi.string(),
    activities: Joi.string(),
    transportation_details: Joi.string(),
    accommodation_details: Joi.string(),
    });
  
      return schema.validate(itinerary)
};

module.exports.Itinerary = mongoose.model('Itinerary', itinerarySchema);
module.exports.validateItinerary = validateItinerary;