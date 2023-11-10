const router = require('express').Router();
const { createItinerary, 
    updateItinerary,
    deleteItinerary,
    getSpecificItineraries,
    itinerariesByUserId,
} = require('../controllers/itineraryControllers');
const authorize = require('../middlewares/authorize');

router.route('/create-itinerary')
            .post(authorize, createItinerary);

router.route('/update-itinerary/:id')
            .put(authorize, updateItinerary);

router.route('/delete-itinerary/:id')
            .delete(authorize, deleteItinerary);

router.route('/search-specific-itinerary/:id')
            .get(authorize, getSpecificItineraries);

router.route('/search-itinerary-userId/:userId')
            .get(authorize, itinerariesByUserId);


module.exports = router;