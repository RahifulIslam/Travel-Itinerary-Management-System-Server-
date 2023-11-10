const {Itinerary, validateItinerary} = require('../model/itineraryModel');

const createItinerary = async(req, res)=> {
    try{
        const userInformation = req.user;
        // console.log("User Information", userInformation);
        const { error } = validateItinerary(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const itinerary = new Itinerary({
            name: req.body.name,
            dates: req.body.dates,
            destinations: req.body.destinations,
            activities: req.body.activities,
            transportation_details: req.body.transportation_details,
            accommodation_details: req.body.accommodation_details,
            created_by: userInformation._id,
        });
        await itinerary.save();
        res.status(201).json({
            message: "Itinerary created successfully",
            result: itinerary
        });
    } catch(error){
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

const updateItinerary = async(req, res)=> {
    try {
        const userInformation = req.user;
        // console.log("User Information", userInformation);
        const { error } = validateItinerary(req.body);
        if (error) {
            return res.status(400).send(error.details[0].message);
        }

        const itinerary = await Itinerary.findById(req.params.id);
        if (!itinerary) {
            return res.status(404).send('Itinerary not found');
        }

        // Update the itinerary fields
        itinerary.name = req.body.name;
        itinerary.dates = req.body.dates;
        itinerary.destinations = req.body.destinations;
        itinerary.activities = req.body.activities;
        itinerary.transportation_details = req.body.transportation_details;
        itinerary.accommodation_details = req.body.accommodation_details;
        itinerary.updated_by = userInformation._id;

        await itinerary.save();

        res.json({
            message: "Itinerary updated successfully",
            result: itinerary
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

const deleteItinerary = async(req, res)=> {
    try {
        const itinerary = await Itinerary.findByIdAndDelete(req.params.id);
        if (!itinerary) {
            return res.status(404).send('Itinerary not found');
        }
        res.json({ 
            message: 'Itinerary deleted successfully', 
            deletedItinerary: itinerary 
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

const getSpecificItineraries = async(req, res)=> {
    try {
        const itinerary = await Itinerary.findById(req.params.id);
        if (!itinerary) {
            return res.status(404).send('Itinerary not found');
        }
        res.json(itinerary);
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

const itinerariesByUserId = async(req, res)=> {
    // console.log('Received userId:', req.params.userId);
    try {
        const itineraries = await Itinerary.find({ created_by: req.params.userId });
        console.log("Itineraries list are:", itineraries)
        if (!itineraries || itineraries.length === 0) {
            return res.status(404).send('No itineraries found for the specified user');
        }
        res.json({
            message: "Showed itineraries list by user Id",
            result: itineraries
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Internal Server Error');
    }
}

module.exports = {
    createItinerary,
    updateItinerary,
    deleteItinerary,
    itinerariesByUserId,
    getSpecificItineraries,
}