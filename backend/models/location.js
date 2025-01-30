const mongoose = require('mongoose');

const vendorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true
        },
        coordinates: {
            type: [Number],
            required: true
        }
    },
    crops: [{
        type: String
    }],
    foodBaskets: [{
        type: String
    }],
    animalProducts: [{
        type: String
    }],
    isOrganic: {
        type: Boolean,
        default: false
    },
    rating: {
        type: Number,
        min: 0,
        max: 5,
        default: 0
    },
    reviews: [{
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        },
        rating: Number,
        comment: String,
        date: {
            type: Date,
            default: Date.now
        }
    }]
});

// Create a 2dsphere index for geospatial queries
vendorSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Vendor', vendorSchema); 