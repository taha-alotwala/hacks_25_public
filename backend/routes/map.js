const express = require('express');
const router = express.Router();
const Vendor = require('../models/location');

// Get vendors within radius
router.get('/vendors', async (req, res) => {
  try {
    const {
      farmName,
      crop,
      basket,
      animalProduct,
      distance = 5,
      lat,
      lng,
      organic
    } = req.query;

    // Build query
    const query = {
      location: {
        $near: {
          $geometry: {
            type: 'Point',
            coordinates: [parseFloat(lng), parseFloat(lat)]
          },
          $maxDistance: parseInt(distance) * 1000 // Convert km to meters
        }
      }
    };

    if (farmName) {
      query.name = new RegExp(farmName, 'i');
    }

    if (crop) {
      query.crops = crop;
    }

    if (basket) {
      query.foodBaskets = basket;
    }

    if (animalProduct) {
      query.animalProducts = animalProduct;
    }

    if (organic === 'true') {
      query.isOrganic = true;
    }

    const vendors = await Vendor.find(query)
      .select('name location isOrganic rating')
      .limit(100)
      .lean(); // Convert to plain JavaScript objects

    // Ensure we're sending an array
    res.json(vendors || []);
  } catch (error) {
    console.error('Error fetching vendors:', error);
    res.status(500).json({ message: 'Error fetching vendors' });
  }
});

// Add new vendor
router.post('/vendors', async (req, res) => {
  try {
    const vendor = new Vendor(req.body);
    await vendor.save();
    res.status(201).json(vendor);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;