const express = require('express');
const router = express.Router();
const Vendor = require('../models/map'); // Make sure this path is correct

// Get vendors within radius
router.get('/vendors', async (req, res) => {
    try {
        const { lat, lng, distance = 5 } = req.query;

        if (!lat || !lng) {
            return res.status(400).json({ 
                error: 'Latitude and longitude are required' 
            });
        }

        // Convert string parameters to numbers
        const latitude = parseFloat(lat);
        const longitude = parseFloat(lng);
        const radius = parseFloat(distance);

        const vendors = await Vendor.find({
            location: {
                $near: {
                    $geometry: {
                        type: 'Point',
                        coordinates: [longitude, latitude] // Note: GeoJSON format is [lng, lat]
                    },
                    $maxDistance: radius * 1000 // Convert km to meters
                }
            }
        }).limit(50);

        res.json(vendors);
    } catch (error) {
        console.error('Error fetching vendors:', error);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;